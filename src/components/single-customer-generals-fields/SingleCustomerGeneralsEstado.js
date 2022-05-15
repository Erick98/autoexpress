import React, { useEffect, useState } from "react";
import firebase from "../../utils/firebase";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function SingleCustomerGeneralsEstado({
  id,
  options,
  defaultValue,
  handleChange,
  getOptionLabel,
  newCustomer,
}) {
  return newCustomer ? (
    newCustomer.ID_PAIS === "MEX" ? (
      <Autocomplete
        id={id}
        options={options}
        defaultValue={defaultValue}
        onChange={(e, newValue) => handleChange(newValue, "ESTADO")}
        getOptionLabel={getOptionLabel}
        renderInput={(params) => (
          <TextField
            fullWidth
            {...params}
            autoComplete="off"
            label="Estado"
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
        onChange={(e) => handleChange(e.target.value, "ESTADO")}
        autoComplete="off"
        label="Estado"
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
