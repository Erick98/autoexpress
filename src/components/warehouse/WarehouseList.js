import React, { useState, useEffect } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  Grid,
  TableBody,
  Select,
} from "@material-ui/core";
import firebase from "../../utils/firebase";

const Item = ({ item, id }) => {
  return (
    <TableRow>
      <TableCell>{item.guide}</TableCell>
      <TableCell>{item.description}</TableCell>
      <TableCell>
        <Select
          native
          value={item.status}
          onChange={(e) =>
            firebase.update(
              `warehouse/${id}/list`,
              item.id,
              "status",
              e.target.value
            )
          }
          inputProps={{
            name: "status",
            id: "status",
          }}
        >
          <option aria-label="None" value="" />
          <option value="in-process">En Proceso</option>
          <option value="in-warehouse">En Almacén</option>
          <option value="done">Terminado</option>
        </Select>
      </TableCell>
    </TableRow>
  );
};

export default function WarehouseList({ id }) {
  const [inprocess, setinprocess] = useState([]);
  const [inwarehouse, setinwarehouse] = useState([]);
  const [done, setdone] = useState([]);

  useEffect(() => {
    if (id) {
      firebase
        .getCollection(`warehouse/${id}/list`)
        .where("status", "==", "in-process")
        .onSnapshot((snap) => {
          const data = snap.docs.map((doc) => doc.data());
          setinprocess(data);
        });
      firebase
        .getCollection(`warehouse/${id}/list`)
        .where("status", "==", "in-warehouse")
        .onSnapshot((snap) => {
          const data = snap.docs.map((doc) => doc.data());
          setinwarehouse(data);
        });
      firebase
        .getCollection(`warehouse/${id}/list`)
        .where("status", "==", "done")
        .onSnapshot((snap) => {
          const data = snap.docs.map((doc) => doc.data());
          setdone(data);
        });
    }
  }, [id]);

  return (
    <Grid item xs={12} md={8}>
      <h3>En proceso</h3>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell variant="head">Número de Guía</TableCell>
            <TableCell variant="head">Descripción</TableCell>
            <TableCell variant="head">Estatus</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {inprocess.map((item) => (
            <Item item={item} id={id} key={item.id} />
          ))}
        </TableBody>
      </Table>

      <h3>En almacén</h3>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell variant="head">Número de Guía</TableCell>
            <TableCell variant="head">Descripción</TableCell>
            <TableCell variant="head">Estatus</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {inwarehouse.map((item) => (
            <Item item={item} id={id} key={item.id} />
          ))}
        </TableBody>
      </Table>

      <h3>Entregados</h3>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell variant="head">Número de Guía</TableCell>
            <TableCell variant="head">Descripción</TableCell>
            <TableCell variant="head">Estatus</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {done.map((item) => (
            <Item item={item} id={id} key={item.id} />
          ))}
        </TableBody>
      </Table>
    </Grid>
  );
}
