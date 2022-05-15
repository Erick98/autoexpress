import React, { useState } from "react";
import firebase from "../utils/firebase";
import { Button, TextField } from "@material-ui/core";
import { css } from "@emotion/core";

export default function AddPayrollCategory() {
  const [state, setstate] = useState({});

  const handleChange = (index, value) => {
    var newState = { ...state };
    newState[index] = value;
    setstate(newState);
  };

  return (
    <>
      <h3>Nueva Categoría de Empleado</h3>
      <TextField
        label="Nombre de categoría"
        value={state.name}
        fullWidth
        variant="outlined"
        onChange={(e) => handleChange("name", e.target.value)}
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
      if (state.name) {
        firebase.simpleAdd(state, "payrollCategory").then((id) => {
          alert("Categoría Agregada");
        });
      } else {
        alert("Completa el nombre para continuar");
      }
    } catch (error) {
      alert(error.message);
    }
  }
}
