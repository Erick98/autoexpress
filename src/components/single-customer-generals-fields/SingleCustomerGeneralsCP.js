import React, { useEffect, useState } from "react";
import firebase from "../../utils/firebase";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import _ from "lodash";

export default function SingleCustomerGeneralsCP({
  id,
  defaultValue,
  handleChange,
  getOptionLabel,
  newCustomer,
}) {
  const [cps, setcps] = useState([]);

  useEffect(() => {
    if (newCustomer.ESTADO?.Clave && newCustomer.MUNICIPIO?.Clave) {
      firebase
        .getCollection("cps")
        .where(
          "c_Estado",
          "==",
          newCustomer.ESTADO.Clave === "CMX" ? "DIF" : newCustomer.ESTADO.Clave
        )
        .where("c_Municipio", "==", newCustomer.MUNICIPIO.Clave)
        .get()
        .then((snap) => {
          const data = snap.docs.map((doc) => doc.data());
          setcps(data);
        });
    }
  }, [newCustomer.ESTADO, newCustomer.MUNICIPIO]);

  return newCustomer ? (
    newCustomer.ID_PAIS === "MEX" ? (
      <Autocomplete
        id={id}
        options={cps}
        defaultValue={defaultValue}
        onChange={(e, newValue) => handleChange(newValue, "CP")}
        getOptionLabel={getOptionLabel}
        renderInput={(params) => (
          <TextField
            fullWidth
            {...params}
            autoComplete="off"
            label="Código Postal"
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
        onChange={(e) => handleChange(e.target.value, "CP")}
        autoComplete="off"
        label="Código Postal"
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
