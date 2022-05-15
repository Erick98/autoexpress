import React, { useEffect, useState } from "react";
import firebase from "../utils/firebase";
import {
  Container,
  List,
  ListItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { css } from "@emotion/core";
import Loader from "../components/Loader";

export default function SingleVehicle(props) {
  const { id } = props.match.params;
  const [vehicle, setvehicle] = useState(null);

  useEffect(() => {
    firebase
      .getDocument("vehicles", id)
      .get()
      .then((snap) => {
        const data = snap.data();
        setvehicle(data);
      });
  }, [id]);

  return vehicle ? (
    <Container>
      <h3>Detalle de Cliente</h3>
      <List>
        <ListItem>
          <b>Placas: </b>
          {` `}
          <span>{vehicle.placas}</span>
        </ListItem>
        <ListItem>
          <b>Ma: </b>
          <span>{vehicle.brand}</span>
        </ListItem>
        <ListItem>
          <b>Modelo: </b>
          <span>{vehicle.model}</span>
        </ListItem>
        <ListItem>
          <b>Año: </b>
          <span>{vehicle.year}</span>
        </ListItem>
        <ListItem>
          <b>Rendimiento: </b>
          <span></span>
        </ListItem>
        <ListItem>
          <b>Fecha de último mantenimiento: </b>
          <span></span>
        </ListItem>
      </List>
      <h3>Mantenimiento</h3>
      <h3>Viajes</h3>
    </Container>
  ) : (
    <Loader />
  );
}
