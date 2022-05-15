import React, { useEffect, useState } from "react";
import firebase from "../utils/firebase";
import { Button, FormControl, MenuItem, TextField } from "@mui/material";
import { css } from "@emotion/react";
import { InputLabel, Select } from "@material-ui/core";
import { calculator } from "../utils/prices";
import _ from "lodash";

export default function AddContent({ remissionId, from, to }) {
  const [state, setstate] = useState({});
  const [list, setlist] = useState([]);

  const handleChange = (index, val) => {
    var newState = { ...state };
    newState[index] = val;
    setstate(newState);
  };

  useEffect(() => {
    firebase
      .getCollection("packagingType")
      .get()
      .then((snap) => {
        const data = snap.docs.map((doc) => doc.data());
        setlist(data);
      });
  }, []);

  return (
    <form
      css={css`
        padding: 0 1rem 1rem 1rem;
      `}
      onSubmit={(e) => e.preventDefault() && false}
    >
      <h3>Agregar Contenido</h3>
      <TextField
        id="outlined-basic"
        label="Cantidad"
        variant="outlined"
        type="number"
        fullWidth
        value={state.quantity}
        onChange={(e) => handleChange("quantity", e.target.value)}
        css={css`
          margin-bottom: 1rem;
        `}
      />
      <FormControl variant="outlined" fullWidth>
        <InputLabel id="packaging">Embalaje</InputLabel>
        <Select
          labelId="packaging"
          id="demo-simple-select"
          value={state.packaging}
          label="Age"
          onChange={(e) => handleChange("packaging", e.target.value)}
          css={css`
            margin-bottom: 1rem;
          `}
        >
          {list.map((item) => (
            <MenuItem value={item.name}>{item.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        id="outlined-basic"
        label="Descripción"
        variant="outlined"
        type="text"
        fullWidth
        value={state.description}
        onChange={(e) => handleChange("description", e.target.value)}
        css={css`
          margin-bottom: 1rem;
        `}
      />
      <TextField
        id="outlined-basic"
        label="Peso (kg)"
        variant="outlined"
        type="number"
        fullWidth
        value={state.weight}
        onChange={(e) => handleChange("weight", e.target.value)}
        css={css`
          margin-bottom: 1rem;
        `}
      />
      <TextField
        id="outlined-basic"
        label="M3"
        variant="outlined"
        type="number"
        fullWidth
        value={state.m3}
        onChange={(e) => handleChange("m3", e.target.value)}
        css={css`
          margin-bottom: 1rem;
        `}
      />
      <Button
        css={css`
          margin-top: 1rem;
        `}
        variant="contained"
        fullWidth
        onClick={handleSubmit}
      >
        Agregar
      </Button>
    </form>
  );

  async function handleSubmit() {
    try {
      if (from && to) {
        if (state.quantity && state.packaging && state.description) {
          if (state.weight || state.m3) {
            var newState = { ...state };
            newState.weight = Number(state.weight);
            newState.m3 = Number(state.m3);
            newState.quantity = Number(state.quantity);
            const resp = calculator(newState);
            const list = resp.list;

            const filter = list.filter((item) =>
              item.cities.some((ware) => ware.includes(from))
            );
            const secondFilter = filter.filter((item) =>
              item.cities.some((ware) => ware.includes(to))
            );
            const amount = secondFilter[0].amount;
            newState.price = amount;
            firebase
              .simpleAdd(newState, `/remissions/${remissionId}/content`)
              .then(() => {
                alert("Elemento agregado");
                setstate({});
              });
          } else {
            alert("Ingresa peso o m3");
          }
        } else {
          alert("Ingresa cantidad, embalaje y descripción para continuar");
        }
      } else {
        alert(
          "Selecciona la bodega de salida y de entrega para poder calcular el precio"
        );
      }
    } catch (error) {
      alert(error.message);
    }
  }
}
