import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import { Container, ButtonGroup, Button, Box } from "@material-ui/core";

import Customers from "./Customers";
import SingleCustomer from "./SingleCustomer";
import Billing from "./Billing";
import Quotes from "./Quotes";
import SingleQuote from "./SingleQuote";
import SingleBill from "./SingleBill";

export default function Sales(props) {
  const loc = props.location.pathname.split("/")[2];
  // const { rol } = props

  return (
    <Container>
      <ButtonGroup
        size="large"
        color="primary"
        aria-label="large outlined primary button group"
      >
        <Button style={{ cursor: "default" }} variant="contained">
          Ventas
        </Button>
        <Button
          disabled={loc === undefined ? true : ""}
          component={Link}
          to="/ventas"
        >
          Clientes
        </Button>
        <Button
          disabled={loc === "facturacion" ? true : ""}
          component={Link}
          to="/ventas/facturacion"
        >
          Facturación
        </Button>
        <Button
          disabled={loc === "cotizaciones" ? true : ""}
          component={Link}
          to="/ventas/cotizaciones"
        >
          Cotizaciones
        </Button>
      </ButtonGroup>
      <Box paddingY="1rem">
        <Switch>
          <Route path="/ventas" component={Customers} exact={true} />
          <Route path="/ventas/facturacion" component={Billing} exact={true} />
          <Route
            path="/ventas/facturacion/:id"
            component={SingleBill}
            exact={true}
          />
          <Route path="/ventas/cotizaciones" component={Quotes} exact={true} />
          <Route
            path="/ventas/cotizaciones/:id"
            component={SingleQuote}
            exact={true}
          />
          <Route path="/ventas/clientes/:id" component={SingleCustomer} />
        </Switch>
      </Box>
    </Container>
  );
}
