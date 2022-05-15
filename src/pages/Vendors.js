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
import AddVendor from "../components/AddVendor";

export default function Vendors() {
  const [list, setlist] = useState([]);
  const [open, setopen] = useState(false);

  useEffect(() => {
    firebase.getCollection("vendors").onSnapshot((snap) => {
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
          Nuevo Vendedor
        </Button>
      </div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell variant="head" component="th" align="center">
              Nombre
            </TableCell>
            <TableCell variant="head" component="th" align="center">
              Email
            </TableCell>
            <TableCell variant="head" component="th" align="center">
              Teléfono
            </TableCell>
            <TableCell variant="head" component="th" align="center">
              Ver más
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.NOMBRE}</TableCell>
              <TableCell>{item.CORREO}</TableCell>
              <TableCell>{item.TELEFONO}</TableCell>
              <TableCell align="center">
                <IconButton
                  component={Link}
                  to={`/vendedores/${item.id}`}
                  color="primary"
                  disabled
                >
                  <ArrowForwardIosIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Modal open={open} handleClose={handleClose}>
        <AddVendor />
      </Modal>
    </>
  );
}
