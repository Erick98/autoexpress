import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import firebase from "../utils/firebase";
import { Button, ButtonGroup, Container } from "@material-ui/core";
import { Typography, Box, Tabs, Tab } from "@mui/material";

import Loader from "../components/Loader";
import RemissionDetail from "../components/remissions/RemissionDetail";
import RemissionInvoice from "../components/remissions/RemissionInvoice";
import RemissionBalance from "../components/remissions/RemissionBalance";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function SingleRemission(props) {
  const { id } = props.match.params;
  const [remission, setremission] = useState(null);
  const [value, setValue] = useState(0);
  const [paymentmethods, setpaymentmethods] = useState([]);
  const [warehouse, setwarehouse] = useState([]);
  const [customer, setcustomer] = useState([]);
  const [content, setcontent] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleUpdate = (index, val) => {
    firebase.update("remissions", id, index, val);
  };

  useEffect(() => {
    firebase.getDocument("remissions", id).onSnapshot((snap) => {
      const data = snap.data();
      firebase
        .getDocument("customers", data.customer)
        .get()
        .then((snapChild) => {
          const cust = snapChild.data();
          setcustomer(cust);
          setremission(data);
        });
    });
    firebase.getCollection(`remissions/${id}/content`).onSnapshot((snap) => {
      const data = snap.docs.map((doc) => doc.data());
      setcontent(data);
    });
    firebase
      .getCollection("paymentmethods")
      .get()
      .then((snap) => {
        const data = snap.docs.map((doc) => doc.data());
        setpaymentmethods(data);
      });
    firebase
      .getCollection("warehouse")
      .get()
      .then((snap) => {
        const data = snap.docs.map((doc) => doc.data());
        setwarehouse(data);
      });
  }, [id]);

  return remission ? (
    <Container>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Detalle" {...a11yProps(0)} />
            <Tab label="Facturación" {...a11yProps(1)} />
            {/* <Tab label="Cancelación" {...a11yProps(2)} /> */}
            <Tab label="Evidencias" {...a11yProps(2)} />
            {/* <Tab label="Tracking" {...a11yProps(3)} /> */}
            <Tab label="Estado de Cuenta" {...a11yProps(3)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <RemissionDetail
            paymentmethods={paymentmethods}
            remission={remission}
            warehouse={warehouse}
            id={id}
            content={content}
            handleUpdate={handleUpdate}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <RemissionInvoice
            data={remission}
            customer={customer}
            content={content}
          />
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
        <TabPanel value={value} index={3}>
          <RemissionBalance
            content={content}
            data={remission}
            customer={customer}
          />
        </TabPanel>
      </Box>
    </Container>
  ) : (
    <Loader />
  );
}
