import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import firebase from "../utils/firebase";
import { Button, TextField } from "@material-ui/core";
import { css } from "@emotion/core";
import moment from "moment";

export default function AddVendor() {
  const history = useHistory();
  const [state, setstate] = useState({});

  const handleChange = (index, value) => {
    var newState = { ...state };
    newState[index] = value;
    setstate(newState);
  };

  return (
    <>
      <h3>Nuevo Proveedor</h3>
      <TextField
        label="Nombre"
        value={state.NOMBRE}
        fullWidth
        variant="outlined"
        onChange={(e) => handleChange("NOMBRE", e.target.value)}
        css={css`
          margin-top: 1rem;
        `}
      />
      <TextField
        label="Correo"
        value={state.CORREO}
        fullWidth
        variant="outlined"
        onChange={(e) => handleChange("CORREO", e.target.value)}
        css={css`
          margin-top: 1rem;
        `}
      />
      <TextField
        label="RFC"
        value={state.RFC}
        fullWidth
        variant="outlined"
        onChange={(e) => handleChange("RFC", e.target.value)}
        css={css`
          margin-top: 1rem;
        `}
      />
      <TextField
        label="Zona"
        value={state.ZONA}
        fullWidth
        variant="outlined"
        onChange={(e) => handleChange("ZONA", e.target.value)}
        css={css`
          margin-top: 1rem;
        `}
      />
      <TextField
        label="Teléfono"
        value={state.TELEFONO}
        fullWidth
        variant="outlined"
        onChange={(e) => handleChange("TELEFONO", e.target.value)}
        css={css`
          margin-top: 1rem;
        `}
      />
      <TextField
        label="Fecha de Ingreso"
        value={state.phone}
        fullWidth
        variant="outlined"
        type="date"
        onChange={(e) => handleChange("FECHA_ING", e.target.value)}
        css={css`
          margin-top: 1rem;
        `}
      />
      <Button
        onClick={handleSubmit}
        css={css`
          margin-top: 1rem;
        `}
        variant="contained"
        fullWidth
        color="primary"
      >
        Agregar
      </Button>
    </>
  );

  async function handleSubmit() {
    try {
      if (state.NOMBRE && state.CORREO && state.TELEFONO) {
        var newState = { ...state };
        var newDate = moment(state.FECHA_ING, "YYYY-MM-DD").valueOf();
        newState.FECHA_ING = newDate;
        firebase.simpleAdd(newState, "vendors").then((id) => {
          alert("Vendedor Agregado");
          // history.push(`/vendedores/${id}`);
        });
      } else {
        alert("Completa nombre, email y teléfono para continuar");
      }
    } catch (error) {
      alert(error.message);
    }
  }
}
