import React, { useEffect, useState } from "react";
import {
  Container,
  Button,
  AppBar,
  Toolbar,
  Typography,
  TableCell,
} from "@material-ui/core";
import { css } from "@emotion/core";

import AddIcon from "@material-ui/icons/Add";

import Modal from "../components/Modal";
import AddRemission from "../components/AddRemission";
import firebase from "../utils/firebase";
import {
  IconButton,
  Table,
  TableBody,
  TableHead,
  TableRow,
} from "@mui/material";
import Customer from "../components/Customer";
import WarehouseItem from "../components/WarehouseItem";
import SendIcon from "@mui/icons-material/Send";
import { Link } from "react-router-dom";
import moment from "moment";

export default function Remissions() {
  const [modalOpen, setmodalOpen] = useState(null);
  const [list, setlist] = useState([]);

  useEffect(() => {
    firebase.getCollection("remissions").onSnapshot((snap) => {
      const data = snap.docs.map((doc) => doc.data());
      setlist(data);
    });
  }, []);

  return (
    <Container>
      <AppBar position="relative">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit">
            Remisiones
          </Typography>
          <Button
            onClick={() => setmodalOpen(true)}
            css={css`
              margin-left: auto;
            `}
            color="secondary"
            variant="contained"
            size="small"
          >
            <AddIcon
              css={css`
                margin-right: 0.5rem;
              `}
            />{" "}
            Agregar Remisión
          </Button>
        </Toolbar>
      </AppBar>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Folio</TableCell>
            <TableCell>Fecha de Creación</TableCell>
            <TableCell>Cliente</TableCell>
            <TableCell>Oficina Responsable</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((item) => (
            <TableRow>
              <TableCell>{item.folio}</TableCell>
              <TableCell>
                {moment(item.timestamp).format("DD-MM-YYYY hh:mm a")}
              </TableCell>
              <TableCell>
                <Customer id={item.customer} />
              </TableCell>
              <TableCell>
                <WarehouseItem id={item.warehouse} />
              </TableCell>
              <TableCell>
                <IconButton
                  component={Link}
                  to={`/remisiones/detalle/${item.id}`}
                  color="secondary"
                >
                  <SendIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Modal open={modalOpen} handleClose={() => setmodalOpen(null)}>
        <AddRemission handleClose={() => setmodalOpen(null)} />
      </Modal>
    </Container>
  );
}
