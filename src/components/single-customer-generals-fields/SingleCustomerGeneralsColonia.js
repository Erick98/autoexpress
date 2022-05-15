import React, { useEffect, useState } from "react";
import firebase from "../../utils/firebase";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import _ from "lodash";

export default function SingleCustomerGeneralsColonia({
  id,
  defaultValue,
  handleChange,
  getOptionLabel,
  newCustomer,
}) {
  const [colonias, setcolonias] = useState([]);

  useEffect(() => {
    if (newCustomer.CP?.c_CodigoPostal) {
      firebase
        .getCollection("colonias")
        .where("c_CodigoPostal", "==", newCustomer.CP.c_CodigoPostal)
        .get()
        .then((snap) => {
          const data = snap.docs.map((doc) => doc.data());
          setcolonias(data);
        });
    }
  }, [newCustomer.CP]);

  return newCustomer ? (
    newCustomer.ID_PAIS === "MEX" ? (
      <Autocomplete
        id={id}
        options={colonias}
        defaultValue={defaultValue}
        onChange={(e, newValue) => handleChange(newValue, "COLONIA")}
        getOptionLabel={getOptionLabel}
        renderInput={(params) => (
          <TextField
            fullWidth
            {...params}
            autoComplete="off"
            label="Colonia"
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
        onChange={(e) => handleChange(e.target.value, "COLONIA")}
        autoComplete="off"
        label="Colonia"
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
