import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import firebase from "../utils/firebase";
import { Button, TextField } from "@material-ui/core";
import moment from "moment";
import { css } from "@emotion/core";
import { Autocomplete } from "@mui/material";

export default function AddRemission({ handleClose }) {
  const history = useHistory();
  const [state, setstate] = useState({});
  const [customers, setcustomers] = useState([]);
  const [selectedCustomer, setselectedCustomer] = useState(null);

  useEffect(() => {
    firebase
      .getCollection("customers")
      .get()
      .then((snap) => {
        const data = snap.docs.map((doc) => ({
          label: `${doc.data().name} - ${doc.data().rfc} - ${
            doc.data().email
          } - ${doc.data().phone}`,
          value: doc.id,
          haveCredit: doc.data().haveCredit,
          daysCredit: doc.data().daysCredit,
        }));
        setcustomers(data);
      });
  }, []);

  return (
    <>
      <h3>Nueva Remisión</h3>
      <Autocomplete
        disablePortal
        options={customers}
        value={selectedCustomer}
        onChange={(event, newValue) => {
          console.log(newValue);
          setselectedCustomer(newValue);
        }}
        renderInput={(params) => (
          <TextField {...params} label="Cliente" variant="outlined" />
        )}
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
    if (selectedCustomer) {
      var newState = { ...state };
      newState.customer = selectedCustomer.value;
      newState.haveCredit = selectedCustomer.haveCredit;
      newState.daysCredit = selectedCustomer.daysCredit;
      newState.status = "creating";
      if (newState.customer) {
        firebase.simpleAdd(newState, "remissions").then((id) => {
          history.push(`/remisiones/detalle/${id}`);
          handleClose();
        });
      } else {
        alert("Completa todos los campos para continuar");
      }
    } else {
      alert("Selecciona un cliente para continuar");
    }
  }
}
