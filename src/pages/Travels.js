import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import firebase from "../utils/firebase";
import {
  Container,
  Button,
  Grid,
  Paper,
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  FormControl,
  InputLabel,
  Select,
  TableBody,
  IconButton,
} from "@material-ui/core";
import moment from "moment";
import { css } from "@emotion/core";

import SendIcon from "@mui/icons-material/Send";

export default function Travels() {
  const history = useHistory();
  const [state, setstate] = useState({});
  const [travels, settravels] = useState([]);
  const [employees, setemployees] = useState([]);
  const [vehicles, setvehicles] = useState([]);
  const [warehouse, setwarehouse] = useState([]);

  const handleChange = (index, value) => {
    var newState = { ...state };
    newState[index] = value;
    setstate(newState);
  };

  useEffect(() => {
    firebase
      .getCollection("travels")
      .get()
      .then((snap) => {
        const data = snap.docs.map((doc) => doc.data());
        settravels(data);
      });
    firebase
      .getCollection("employee")
      .where("category", "==", "Chofer")
      .get()
      .then((snap) => {
        const data = snap.docs.map((doc) => doc.data());
        setemployees(data);
      });
    firebase
      .getCollection("vehicles")
      .get()
      .then((snap) => {
        const data = snap.docs.map((doc) => doc.data());
        setvehicles(data);
      });
    firebase
      .getCollection("warehouse")
      .get()
      .then((snap) => {
        const data = snap.docs.map((doc) => doc.data());
        setwarehouse(data);
      });
  }, []);

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
              label="Folio"
              value={state.folio}
              onChange={(e) => handleChange("folio", e.target.value)}
              fullWidth
              variant="outlined"
              css={css`
                margin-bottom: 1rem;
              `}
            />
            <FormControl
              fullWidth
              css={css`
                margin-bottom: 1rem;
              `}
            >
              <InputLabel htmlFor="vehicle">Vehículo</InputLabel>
              <Select
                native
                value={state.vehicle}
                onChange={(e) => handleChange("vehicle", e.target.value)}
                inputProps={{
                  name: "vehicle",
                  id: "vehicle",
                }}
              >
                <option aria-label="None" value="" />
                {vehicles.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.placas} - {item.brand} {item.model} - {item.year}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl
              fullWidth
              css={css`
                margin-bottom: 1rem;
              `}
            >
              <InputLabel htmlFor="driver">Chofer</InputLabel>
              <Select
                native
                value={state.driver}
                onChange={(e) => handleChange("driver", e.target.value)}
                inputProps={{
                  name: "driver",
                  id: "driver",
                }}
              >
                <option aria-label="None" value="" />
                {employees.map((item) => (
                  <option value={item.id} key={item.id}>
                    {item.name}
                  </option>
                ))}
              </Select>
            </FormControl>
            <TextField
              value={state.date}
              onChange={(e) => handleChange("date", e.target.value)}
              fullWidth
              variant="outlined"
              type="date"
              css={css`
                margin-bottom: 1rem;
              `}
            />
            <FormControl
              fullWidth
              css={css`
                margin-bottom: 1rem;
              `}
            >
              <InputLabel htmlFor="from">Almacén de Salida</InputLabel>
              <Select
                native
                value={state.from}
                onChange={(e) => handleChange("from", e.target.value)}
                inputProps={{
                  name: "from",
                  id: "from",
                }}
              >
                <option aria-label="None" value="" />
                {warehouse.map((item) => (
                  <option key={item.id}>{item.name}</option>
                ))}
              </Select>
            </FormControl>
            <FormControl
              fullWidth
              css={css`
                margin-bottom: 1rem;
              `}
            >
              <InputLabel htmlFor="to">Almacén de Recepción</InputLabel>
              <Select
                native
                value={state.to}
                onChange={(e) => handleChange("to", e.target.value)}
                inputProps={{
                  name: "to",
                  id: "to",
                }}
              >
                <option aria-label="None" value="" />
                {warehouse.map((item) => (
                  <option key={item.id}>{item.name}</option>
                ))}
              </Select>
            </FormControl>
            <Button
              onClick={handleSubmit}
              fullWidth
              variant="contained"
              color="primary"
            >
              Continuar
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell variant="head" component="th" align="center">
                  Fecha de Salida
                </TableCell>
                <TableCell variant="head" component="th" align="center">
                  Estatus
                </TableCell>
                <TableCell variant="head" component="th" align="center">
                  Recorrido
                </TableCell>
                <TableCell variant="head" component="th" align="center">
                  Ver más
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {travels.map((item) => (
                <TableRow>
                  <TableCell>
                    {moment(item.date).format("DD-MM-YYYY")}
                  </TableCell>
                  <TableCell>{item.status}</TableCell>
                  <TableCell>
                    {item.from} - {item.to}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      component={Link}
                      to={`/viajes/${item.id}`}
                      color="secondary"
                    >
                      <SendIcon />
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
      if (state.folio && state.driver && state.date && state.from && state.to) {
        var newState = { ...state };
        newState.date = moment(state.date).valueOf();
        firebase.simpleAdd(state, "travels").then((id) => {
          history.push(`/viajes/${id}`);
        });
      } else {
        alert("Completa todos los campos para continuar");
      }
    } catch (error) {
      alert(error.message);
    }
  }
}

// Desde aquí se podrán crear los viajes, una vez que se da inicio ya no los pueden modificar
// se establecerán el o los destinos a los que irá el vehículo y que repartirá en cada ubicación
// se determinarán el o los choferes encargados del viaje.
