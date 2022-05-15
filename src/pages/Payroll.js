import React, { useState, useEffect } from "react";
import firebase from "../utils/firebase";
import { Link } from "react-router-dom";
import {
  Container,
  Button,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  IconButton,
} from "@material-ui/core";
import { css } from "@emotion/core";

import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

import Modal from "../components/Modal";
import AddEmployee from "../components/AddEmployee";

export default function Payroll() {
  const [list, setlist] = useState([]);
  const [open, setopen] = useState(false);

  useEffect(() => {
    firebase.getCollection("employee").onSnapshot((snap) => {
      const data = snap.docs.map((doc) => doc.data());
      setlist(data);
    });
  }, []);

  const handleClose = () => {
    setopen(false);
  };

  return (
    <Container>
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
          Nuevo Empleado
        </Button>
      </div>
      <Table
        css={css`
          margin-top: 2rem;
        `}
      >
        <TableHead>
          <TableRow>
            <TableCell variant="head" component="th" align="center">
              Nombre
            </TableCell>
            <TableCell variant="head" component="th" align="center">
              Ver detalle
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell align="center">
                <IconButton
                  component={Link}
                  to={`/almacen/${item.id}`}
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
        <AddEmployee />
      </Modal>
    </Container>
  );
}
