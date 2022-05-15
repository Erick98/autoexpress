import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import firebase from "../utils/firebase";
import {
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { css } from "@emotion/core";

import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

import Modal from "../components/Modal";
import AddCustomer from "../components/AddCustomer";

export default function Customers() {
  const [list, setlist] = useState([]);
  const [open, setopen] = useState(false);

  useEffect(() => {
    firebase.getCollection("customers").onSnapshot((snap) => {
      const data = snap.docs.map((doc) => doc.data());
      setlist(data);
    });
  }, []);

  const handleClose = () => {
    setopen(false);
  };

  return (
    <>
      <div
        css={css`
          display: flex;
          width: 100%;
        `}
      >
        <Button
          css={css`
            margin-left: auto;
          `}
          variant="contained"
          color="primary"
          onClick={() => setopen(!open)}
        >
          Nuevo Cliente
        </Button>
      </div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell variant="head" component="th" align="center">
              Razón Social
            </TableCell>
            <TableCell variant="head" component="th" align="center">
              RFC
            </TableCell>
            <TableCell variant="head" component="th" align="center">
              Correo Principal
            </TableCell>
            <TableCell variant="head" component="th" align="center">
              Ver más
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.RAZON_SOCIAL}</TableCell>
              <TableCell>{item.RFC}</TableCell>
              <TableCell>{item.CORREO}</TableCell>
              <TableCell align="center">
                <IconButton
                  component={Link}
                  to={`/ventas/clientes/${item.id}`}
                  color="primary"
                >
                  <ArrowForwardIosIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Modal open={open} handleClose={handleClose}>
        <AddCustomer />
      </Modal>
    </>
  );
}
