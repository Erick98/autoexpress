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

export default function SinglePayroll(props) {
  const { id } = props.match.params;
  const [employee, setemployee] = useState(null);

  useEffect(() => {
    firebase
      .getDocument("employee", id)
      .get()
      .then((snap) => {
        const data = snap.data();
        setemployee(data);
      });
  }, [id]);

  return employee ? (
    <Container>
      <h3>Detalle de Empleado</h3>
      <List>
        <ListItem>
          <b>Nombre: </b>
          {` `}
          <span>{employee.name}</span>
        </ListItem>
        <ListItem>
          <b>Categoría (Área): </b>
          <span>{employee.category}</span>
        </ListItem>
        <ListItem>
          <b>Teléfono: </b>
          <span>{employee.phone}</span>
        </ListItem>
      </List>
    </Container>
  ) : (
    <Loader />
  );
}
