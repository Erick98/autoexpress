import React, { useEffect, useState } from "react";
import firebase from "../../utils/firebase";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function SingleCustomerGeneralsMunicipio({
  id,
  options,
  defaultValue,
  handleChange,
  getOptionLabel,
  newCustomer,
}) {
  const [municipios, setmunicipios] = useState([]);

  useEffect(() => {
    if (newCustomer.ESTADO?.Clave) {
      firebase
        .getCollection("municipios")
        .where("Estado", "==", newCustomer.ESTADO.Clave)
        .get()
        .then((snap) => {
          const data = snap.docs.map((doc) => doc.data());
          setmunicipios(data);
        });
    }
  }, [newCustomer.ESTADO]);

  return newCustomer ? (
    newCustomer.ID_PAIS === "MEX" ? (
      <Autocomplete
        id={id}
        options={municipios}
        defaultValue={defaultValue}
        onChange={(e, newValue) => handleChange(newValue, "MUNICIPIO")}
        getOptionLabel={getOptionLabel}
        renderInput={(params) => (
          <TextField
            fullWidth
            {...params}
            autoComplete="off"
            label="Municipio"
            variant="standard"
            inputProps={{
              ...params.inputProps,
              autoComplete: "new-password",
            }}
          />
        )}
      />
    ) : (
      <TextField
        id={id}
        fullWidth
        defaultValue={defaultValue}
        onChange={(e) => handleChange(e.target.value, "MUNICIPIO")}
        autoComplete="off"
        label="Municipio"
        variant="standard"
        inputProps={{
          autoComplete: "new-password",
        }}
      />
    )
  ) : (
    ""
  );
}
