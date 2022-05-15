import React, { useEffect, useState } from "react";
import firebase from "../utils/firebase";
import {
  Button,
  Container,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  ListItem,
  List,
  IconButton,
  ListItemAvatar,
  TextField,
  Grid,
  Avatar,
  ListItemText,
} from "@material-ui/core";
import { css } from "@emotion/core";
import Loader from "../components/Loader";
import Modal from "../components/Modal";
import AddressSetter from "../components/AddressSetter";

export default function SingleCustomerReceivers() {
  const { id } = props.match.params;
  const [customer, setcustomer] = useState(null);
  const [newCustomer, setnewCustomer] = useState(null);
  const [modalOpen, setmodalOpen] = useState(false);
  const [address, setaddress] = useState([]);

  const handleUpdate = (index, val) => {
    firebase.update("customers", id, index, val);
  };

  useEffect(() => {
    firebase
      .getDocument("customers", id)
      .get()
      .then((snap) => {
        const data = snap.data();
        setcustomer(data);
        setnewCustomer(data);
      });
    firebase.getCollection(`/customers/${id}/address`).onSnapshot((snap) => {
      const data = snap.docs.map((doc) => doc.data());
      setaddress(data);
    });
  }, [id]);

  const handleChange = (val, index) => {
    var newState = { ...newCustomer };
    newState[index] = val;
    setnewCustomer(newState);
  };

  return (
    <Grid container spacing={2}>
      <Grid item md={6} xs={12}>
        <TextField
          defaultValue={customer.paymentAccount}
          onChange={(e) => handleChange(e.target.value, "paymentAccount")}
          id="paymentAccount"
          label="Cuenta de Pago"
          variant="standard"
          fullWidth
        />
        <TextField
          defaultValue={customer.paymentMethod}
          onChange={(e) => handleChange(e.target.value, "paymentMethod")}
          id="paymentMethod"
          label="Método de Pago"
          variant="standard"
          fullWidth
        />
      </Grid>
      <Grid item md={6} xs={12}>
        <TextField
          defaultValue={customer.foreignAccount}
          onChange={(e) => handleChange(e.target.value, "foreignAccount")}
          id="foreignAccount"
          label="Cuenta Extranjera"
          variant="standard"
          fullWidth
        />
        <TextField
          defaultValue={customer.foreignpaymentMethod}
          onChange={(e) => handleChange(e.target.value, "foreignpaymentMethod")}
          id="foreignPaymentMethod"
          label="Método de Pago"
          variant="standard"
          fullWidth
        />
      </Grid>
    </Grid>
  );
}
