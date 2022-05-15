import React, { useEffect, useState } from "react";
import firebase from "../../utils/firebase";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import _ from "lodash";

export default function SingleCustomerGeneralsLocalidad({
  id,
  options,
  defaultValue,
  handleChange,
  getOptionLabel,
  newCustomer,
}) {
  const [localidades, setlocalidades] = useState([]);

  useEffect(() => {
    if (newCustomer.ESTADO?.Clave) {
      firebase
        .getCollection("localidades")
        .where("Estado", "==", newCustomer.ESTADO.Clave)
        .get()
        .then((snap) => {
          const data = snap.docs.map((doc) => doc.data());
          const filter = _.uniqBy(data, "Descripcion");
          setlocalidades(filter);
        });
    }
  }, [newCustomer.ESTADO]);

  return newCustomer ? (
    newCustomer.ID_PAIS === "MEX" ? (
      <Autocomplete
        id={id}
        options={localidades}
        defaultValue={defaultValue}
        onChange={(e, newValue) => handleChange(newValue, "LOCALIDAD")}
        getOptionLabel={getOptionLabel}
        renderInput={(params) => (
          <TextField
            fullWidth
            {...params}
            autoComplete="off"
            label="Localidad"
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
        onChange={(e) => handleChange(e.target.value, "LOCALIDAD")}
        autoComplete="off"
        label="Localidad"
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
