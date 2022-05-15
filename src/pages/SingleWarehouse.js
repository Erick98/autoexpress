import React, { useState, useEffect } from "react";
import firebase from "../utils/firebase";
import { css } from "@emotion/core";
import {
  Button,
  Container,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
} from "@material-ui/core";
import Loader from "../components/Loader";
import WarehouseList from "../components/warehouse/WarehouseList";
import Modal from "../components/Modal";
import AddressSetter from "../components/AddressSetter";

export default function SingleWarehouse(props) {
  const [state, setstate] = useState(null);
  const [modalOpen, setmodalOpen] = useState(false);

  const { id } = props.match.params;
  const [obj, setobj] = useState({
    status: "in-process",
  });

  const handleChange = (index, value) => {
    var newobj = { ...obj };
    newobj[index] = value;
    setobj(newobj);
  };

  useEffect(() => {
    if (id) {
      firebase.getDocument("warehouse", id).onSnapshot((snap) => {
        const data = snap.data();
        setstate(data);
      });
    }
  }, [id]);

  return state ? (
    <Container>
      <h1>Detalle de Almacén</h1>
      <Table
        css={css`
          width: 100%;
          max-width: 35rem;
        `}
      >
        <TableBody>
          <TableRow>
            <TableCell component="th" variant="head">
              Nombre de Almacén
            </TableCell>
            <TableCell>{state.name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" variant="head">
              Dirección
            </TableCell>
            <TableCell>
              {state.address?.formatted_address}
              <Button
                size="small"
                css={css`
                  margin-left: 0.5rem;
                `}
                variant="contained"
                color="primary"
                onClick={() => setmodalOpen(true)}
              >
                Establecer Dirección
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Divider
        css={css`
          margin-top: 2rem;
          margin-bottom: 2rem;
        `}
      />

      <Grid container spacing={4}>
        <Grid
          item
          xs={12}
          md={4}
          component="form"
          onSubmit={(e) => e.preventDefault() && false}
        >
          <TextField
            label="Número de Guía"
            value={obj.guide}
            onChange={(e) => handleChange("guide", e.target.value)}
            fullWidth
            variant="outlined"
            css={css`
              margin-bottom: 1rem;
            `}
          />
          <TextField
            label="Descripción"
            value={obj.description}
            onChange={(e) => handleChange("description", e.target.value)}
            fullWidth
            variant="outlined"
            css={css`
              margin-bottom: 1rem;
            `}
          />
          <Button
            onClick={handleSubmit}
            fullWidth
            variant="contained"
            color="primary"
          >
            Continuar
          </Button>
        </Grid>

        <WarehouseList id={id} />
      </Grid>
      <Modal open={modalOpen} handleClose={() => setmodalOpen(null)}>
        <AddressSetter handleSelect={handleSetAddress} />
      </Modal>
    </Container>
  ) : (
    <Loader />
  );

  async function handleSetAddress(item) {
    firebase.update("warehouse", id, "address", item).then(() => {
      setmodalOpen(null);
    });
  }

  async function handleSubmit() {
    try {
      if (obj.guide && obj.description) {
        firebase.simpleAdd(obj, `warehouse/${id}/list`).then((id) => {
          alert("Elemento agregado");
        });
      } else {
        alert("Completa todos los campos para continuar");
      }
    } catch (error) {
      alert(error.message);
    }
  }
}
