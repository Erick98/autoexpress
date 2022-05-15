import { css } from "@emotion/react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useState } from "react";

export default function WarehouseSetter({
  warehouse,
  handleSelect,
  handleClose,
}) {
  const [selected, setselected] = useState(null);

  const handleSubmit = () => {
    if (selected) {
      handleSelect(selected);
      handleClose();
    } else {
      alert("Selecciona una bodega para continuar");
    }
  };

  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">
          Bodega que en que se entregará
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Age"
          onChange={(e) => setselected(e.target.value)}
        >
          {warehouse.map((item) => (
            <MenuItem value={item.address}>{item.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        css={css`
          margin-top: 1rem;
        `}
        variant="contained"
        fullWidth
        onClick={handleSubmit}
      >
        Continuar
      </Button>
    </>
  );
}
