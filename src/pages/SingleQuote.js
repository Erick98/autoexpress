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

export default function SingleQuote(props) {
  const { id } = props.match.params;
  const [quote, setquote] = useState(null);

  useEffect(() => {
    firebase
      .getDocument("quotes", id)
      .get()
      .then((snap) => {
        const data = snap.data();
        setquote(data);
      });
  }, [id]);

  return quote ? (
    <Container>
      <h3>Detalle de Cliente</h3>
      <List>
        <ListItem>
          <b>Nombre: </b>
          <span>{quote.name}</span>
        </ListItem>
        <ListItem>
          <b>Email: </b>
          <span>{quote.email}</span>
        </ListItem>
        <ListItem>
          <b>Teléfono: </b>
          <span>{quote.phone}</span>
        </ListItem>
      </List>
      <Table
        css={css`
          width: 100%;
          table-layout: fixed;
          margin-top: 2rem;
          th {
            text-align: left !important;
          }
        `}
      >
        <TableBody>
          <TableRow>
            <TableCell>Tipo de Recolección</TableCell>
            <TableCell>{quote.collectType}</TableCell>
            <TableCell>Tipo de Entrega</TableCell>
            <TableCell>{quote.deliveryType}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Lugar de Recolección</TableCell>
            <TableCell>
              {quote.collectType === "Recolección en Sucursal"
                ? quote.collectLocation
                : quote.collectLocation}
            </TableCell>
            <TableCell>Lugar de Entrega</TableCell>
            <TableCell>
              {quote.deliveryType === "Entrega en Sucursal"
                ? quote.deliveryLocation
                : quote.deliveryLocation}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <List>
        <ListItem>
          <b>Cantidad de sobres: </b> <span>{quote.packets}</span>
        </ListItem>
      </List>
      <Table
        css={css`
          width: 100%;
          table-layout: fixed;
          margin-top: 2rem;
        `}
      >
        <TableHead>
          <TableRow>
            <TableCell align="center">#</TableCell>
            <TableCell>Peso</TableCell>
            <TableCell>Largo</TableCell>
            <TableCell>Ancho</TableCell>
            <TableCell>Alto</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {quote.packages?.map((item, index) => (
            <TableRow key={index}>
              <TableCell
                css={css`
                  text-align: center;
                `}
              >
                {index + 1}
              </TableCell>
              <TableCell>{item.weight} kg</TableCell>
              <TableCell>{item.large} cm</TableCell>
              <TableCell>{item.width} cm</TableCell>
              <TableCell>{item.height} cm</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  ) : (
    <Loader />
  );
}
