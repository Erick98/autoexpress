import React, { useState } from "react";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  List,
  ListItem,
  ListItemButton,
  OutlinedInput,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import _ from "lodash";
import { ListItemText } from "@material-ui/core";

export default function AddressSetter({ handleSelect }) {
  const [state, setstate] = useState("");
  const [list, setlist] = useState([]);

  return (
    <>
      <FormControl fullWidth variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Dirección</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          value={state}
          onChange={(e) => setstate(e.target.value)}
          endAdornment={
            <InputAdornment variant="filled" position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleSearch}
                edge="end"
              >
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          }
          label="Dirección"
        />
      </FormControl>
      {!_.isEmpty(list) && (
        <>
          <p>Selecciona una dirección</p>
          <List>
            {list.map((item) => (
              <ListItem disablePadding>
                <ListItemButton onClick={() => handleSelect(item)}>
                  <ListItemText primary={item.formatted_address} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </>
      )}
    </>
  );

  async function handleSearch() {
    if (state) {
      const origin = _.replace(state, " ", "+");
      axios
        .get(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${origin}&key=AIzaSyA39LHNEgqASAk51V0za88oji_Em2rN8lo`
        )
        .then((response) => {
          const results = response.data.results;
          console.log(_.size(results));
          setlist(results);
        })
        .catch((error) => {
          console.log(error);
          alert(
            "Ha ocurrido un error al encontrar la dirección:" + error.message
          );
        });
    } else {
      alert("Escribe una dirección para continuar");
    }
  }
}
