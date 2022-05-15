import React, { useEffect, useState } from "react";
import { Switch, Route, Link } from "react-router-dom";
import firebase from "../utils/firebase";
import { Button, Container, ButtonGroup, Box } from "@material-ui/core";
import Loader from "../components/Loader";

import SingleCustomerGenerals from "./SingleCustomerGenerals";
import SingleCustomerComercials from "./SingleCustomerComercials";

export default function SingleCustomer(props) {
  const loc = props.location.pathname.split("/")[4];
  console.log(loc);

  const { id } = props.match.params;
  const [customer, setcustomer] = useState(null);

  useEffect(() => {
    firebase
      .getDocument("customers", id)
      .get()
      .then((snap) => {
        const data = snap.data();
        setcustomer(data);
      });
  }, [id]);

  return customer ? (
    <Container>
      <ButtonGroup
        size="large"
        color="primary"
        aria-label="large outlined primary button group"
      >
        <Button style={{ cursor: "default" }} variant="contained">
          {customer.RAZON_SOCIAL}
        </Button>
        <Button
          disabled={loc === undefined ? true : ""}
          component={Link}
          to={`/ventas/clientes/${id}`}
        >
          Generales
        </Button>
        <Button
          disabled={loc === "comerciales" ? true : ""}
          component={Link}
          to={`/ventas/clientes/${id}/comerciales`}
        >
          Comerciales
        </Button>
        <Button
          disabled={loc === "contactos" ? true : ""}
          component={Link}
          to={`/ventas/clientes/${id}/contactos`}
        >
          Contactos
        </Button>
      </ButtonGroup>
      <Box paddingY="1rem">
        <Switch>
          <Route
            path="/ventas/clientes/:id"
            component={SingleCustomerGenerals}
            exact={true}
          />
          <Route
            path="/ventas/clientes/:id/comerciales"
            component={SingleCustomerComercials}
            exact={true}
          />
        </Switch>
      </Box>
    </Container>
  ) : (
    <Loader />
  );
}
