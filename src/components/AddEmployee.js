import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import firebase from "../utils/firebase";
import {
  Button,
  FormControl,
  InputLabel,
  Select,
  TextField,
} from "@material-ui/core";
import { css } from "@emotion/core";

export default function AddEmployee() {
  const history = useHistory();
  const [state, setstate] = useState({});
  const [categories, setcategories] = useState([]);

  useEffect(() => {
    firebase
      .getCollection("payrollCategory")
      .get()
      .then((snap) => {
        const data = snap.docs.map((doc) => doc.data());
        setcategories(data);
      });
  }, []);

  const handleChange = (index, value) => {
    var newState = { ...state };
    newState[index] = value;
    setstate(newState);
  };

  return (
    <>
      <h3>Nuevo Empleado</h3>
      <TextField
        label="Nombre de empleado"
        value={state.name}
        fullWidth
        variant="outlined"
        onChange={(e) => handleChange("name", e.target.value)}
        css={css`
          margin-top: 1rem;
        `}
      />
      <FormControl
        fullWidth
        css={css`
          margin-bottom: 1rem;
        `}
      >
        <InputLabel htmlFor="category">Categoría</InputLabel>
        <Select
          native
          value={state.category}
          onChange={(e) => handleChange("category", e.target.value)}
          inputProps={{
            name: "category",
            id: "category",
          }}
        >
          <option aria-label="None" value="" />
          {categories.map((item) => (
            <option value={item.name} key={item.name}>
              {item.name}
            </option>
          ))}
        </Select>
      </FormControl>
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
        firebase.simpleAdd(state, "employee").then((id) => {
          history.push(`/nomina/${id}`);
        });
      } else {
        alert("Completa el nombre para continuar");
      }
    } catch (error) {
      alert(error.message);
    }
  }
}
