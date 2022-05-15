import React, { useState } from "react";
import firebase from "../utils/firebase";
import { Button, TextField } from "@material-ui/core";
import { css } from "@emotion/core";

export default function AddPaymentMethod() {
  const [state, setstate] = useState({});

  const handleChange = (index, value) => {
    var newState = { ...state };
    newState[index] = value;
    setstate(newState);
  };

  return (
    <>
      <h3>Nueva Categoría de Método de Pago</h3>
      <TextField
        label="Clave"
        value={state.clave}
        fullWidth
        variant="outlined"
        onChange={(e) => handleChange("clave", e.target.value)}
        css={css`
          margin-top: 1rem;
        `}
      />
      <TextField
        label="Descripción"
        value={state.description}
        fullWidth
        variant="outlined"
        onChange={(e) => handleChange("description", e.target.value)}
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
        Continuar
      </Button>
    </>
  );

  async function handleSubmit() {
    try {
      if (state.clave && state.description) {
        firebase.simpleAdd(state, "paymentmethods").then((id) => {
          alert("Método de pago agregado");
        });
      } else {
        alert("Completa el nombre para continuar");
      }
    } catch (error) {
      alert(error.message);
    }
  }
}
