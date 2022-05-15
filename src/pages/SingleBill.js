import React, { useEffect, useState } from "react";
import firebase from "../utils/firebase";
import {
  Button,
  ButtonGroup,
  Container,
  List,
  ListItem,
} from "@material-ui/core";
import numeral from "numeral";
import moment from "moment";
import { css } from "@emotion/core";

import Loader from "../components/Loader";
import Customer from "../components/Customer";

export default function SingleBill(props) {
  const { id } = props.match.params;
  const [bill, setbill] = useState(null);

  useEffect(() => {
    firebase
      .getDocument("billing", id)
      .get()
      .then((snap) => {
        const data = snap.data();
        setbill(data);
      });
  }, [id]);

  return bill ? (
    <Container>
      <h3>Detalle de Cliente</h3>
      <List>
        <ListItem>
          <b>ID: </b>
          <span
            css={css`
              margin-left: 0.5rem;
            `}
          >
            {id}
          </span>
        </ListItem>
        <ListItem>
          <b>Fecha: </b>
          <span
            css={css`
              margin-left: 0.5rem;
            `}
          >
            {moment(bill.date).format("DD/MM/YYYY")}
          </span>
        </ListItem>
        <ListItem>
          <b>Cliente: </b>
          <span
            css={css`
              margin-left: 0.5rem;
            `}
          >
            {" "}
            <Customer id={bill.customer} />
          </span>
        </ListItem>
        <ListItem>
          <b>Monto: </b>
          <span
            css={css`
              margin-left: 0.5rem;
            `}
          >
            {numeral(bill.amount).format("$0,0.00")}
          </span>
        </ListItem>
      </List>
      <h3
        css={css`
          margin-top: 2rem;
        `}
      >
        Acciones
      </h3>
      <ButtonGroup
        variant="text"
        color="primary"
        aria-label="contained primary button group"
      >
        <Button>Timbrar y enviar factura</Button>
        <Button>Marcar como Pagada</Button>
        <Button>Cancelar Factura</Button>
      </ButtonGroup>
    </Container>
  ) : (
    <Loader />
  );
}
