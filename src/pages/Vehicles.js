import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Container,
  ButtonGroup,
  Button,
  Box,
  Grid,
  Paper,
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
} from "@material-ui/core";
import firebase from "../utils/firebase";
import { css } from "@emotion/core";

import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

export default function Vehicles() {
  const history = useHistory();
  const [state, setstate] = useState({});
  const [list, setlist] = useState([]);

  useEffect(() => {
    firebase.getCollection("vehicles").onSnapshot((snap) => {
      const data = snap.docs.map((doc) => doc.data());
      setlist(data);
    });
  }, []);

  const handleChange = (index, value) => {
    var newState = { ...state };
    newState[index] = value;
    setstate(newState);
  };

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Paper
            css={css`
              padding: 1rem;
            `}
          >
            <TextField
              label="Placas"
              value={state.placas}
              onChange={(e) => handleChange("placas", e.target.value)}
              fullWidth
              variant="outlined"
              css={css`
                margin-bottom: 1rem;
              `}
            />
            <TextField
              label="Marca"
              value={state.brand}
              onChange={(e) => handleChange("brand", e.target.value)}
              fullWidth
              variant="outlined"
              css={css`
                margin-bottom: 1rem;
              `}
            />
            <TextField
              label="Modelo"
              value={state.model}
              onChange={(e) => handleChange("model", e.target.value)}
              fullWidth
              variant="outlined"
              css={css`
                margin-bottom: 1rem;
              `}
            />
            <TextField
              label="Año"
              value={state.year}
              onChange={(e) => handleChange("year", e.target.value)}
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
              Agregar
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell variant="head" component="th" align="center">
                  Placas
                </TableCell>
                <TableCell variant="head" component="th" align="center">
                  Modelo
                </TableCell>
                <TableCell variant="head" component="th" align="center">
                  Último Mantenimiento
                </TableCell>
                <TableCell variant="head" component="th" align="center">
                  Rendimiento
                </TableCell>
                <TableCell variant="head" component="th" align="center">
                  Ver más
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {list.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.placas}</TableCell>
                  <TableCell>{item.model}</TableCell>
                  <TableCell>{item.last}</TableCell>
                  <TableCell>{item.rend}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      component={Link}
                      to={`/vehiculos/${item.id}`}
                      color="primary"
                    >
                      <ArrowForwardIosIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    </Container>
  );

  async function handleSubmit() {
    try {
      if (state.placas && state.brand && state.model && state.year) {
        firebase.simpleAdd(state, "vehicles").then((id) => {
          history.push(`/vehiculos/${id}`);
        });
      } else {
        alert("Completa todos los campos para continuar");
      }
    } catch (error) {
      alert(error.message);
    }
  }
}

// Desde aquí se gestionará el mantenimiento, consumo de gasolina, recorridos, choferes asignados,
//
