import React, { useEffect, useState } from "react";
import firebase from "../utils/firebase";
import { Grid } from "@material-ui/core";
import Loader from "../components/Loader";
import { FormControl, Input, InputAdornment, InputLabel } from "@mui/material";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function SingleCustomerComercials(props) {
  const { id } = props.match.params;
  const [customer, setcustomer] = useState(null);
  const [newCustomer, setnewCustomer] = useState(null);
  const [vendors, setvendors] = useState([]);
  const [usos, setusos] = useState([]);

  useEffect(() => {
    firebase
      .getDocument("customers", id)
      .get()
      .then((snap) => {
        const data = snap.data();
        setcustomer(data);
        setnewCustomer(data);
      });
    firebase
      .getCollection("vendors")
      .get()
      .then((snap) => {
        const data = snap.docs.map((doc) => doc.data());
        setvendors(data);
      });
    fetch("/resources/CAT_USOCFDI.xml")
      .then((res) => res.text())
      .then((data) => {
        var xml = new XMLParser().parseFromString(data);
        var pre = xml.children;
        const result = pre.map((item) => ({
          c_UsoCFDI: item.attributes.c_RegimenFiscal,
          Descripcion: item.attributes.Descripcion,
          Fisica: item.attributes.Fisica,
          Moral: item.attributes.Moral,
        }));
        setusos(result);
      });
  }, [id]);

  const handleChange = (val, index) => {
    var newState = { ...newCustomer };
    newState[index] = val;
    setnewCustomer(newState);
  };

  return customer ? (
    <Grid container spacing={2}>
      <Grid item md={6} xs={12}>
        <TextField
          defaultValue={customer.DIAS_CRE}
          onChange={(e) => handleChange(e.target.value, "DIAS_CRE")}
          id="DIAS_CRE"
          label="Días de crédito"
          variant="standard"
          type="number"
          fullWidth
        />
        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
          <InputLabel htmlFor="LIMITE_CR">Límite de Crédito</InputLabel>
          <Input
            id="LIMITE_CR"
            value={customer.LIMITE_CR}
            onChange={(e) => handleChange(e.target.value, "LIMITE_CR")}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            type="number"
          />
        </FormControl>
        <ul>
          <li>Saldo Actual: $0.00</li>
          <li>Saldo Vencido: $0.00</li>
          <li>Fecha Último Pago: </li>
          <li>Saldo Última Venta: </li>
        </ul>
        <TextField
          defaultValue={customer.PERSONA_COB}
          onChange={(e) => handleChange(e.target.value, "PERSONA_COB")}
          id="PERSONA_COB"
          label="Persona de Cobranza"
          variant="standard"
          type="text"
          fullWidth
        />
        <TextField
          defaultValue={customer.CORREO_COB}
          onChange={(e) => handleChange(e.target.value, "CORREO_COB")}
          id="CORREO_COB"
          label="Correo de Cobranza"
          variant="standard"
          type="mail"
          fullWidth
        />
        <TextField
          defaultValue={customer.TEL_COB}
          onChange={(e) => handleChange(e.target.value, "TEL_COB")}
          id="TEL_COB"
          label="Teléfono de Cobranza"
          variant="standard"
          type="tel"
          fullWidth
        />
        <TextField
          defaultValue={customer.ALERTA_COB}
          onChange={(e) => handleChange(e.target.value, "ALERTA_COB")}
          id="ALERTA_COB"
          label="Alerta de Cobranza"
          variant="standard"
          type="text"
          fullWidth
        />
        <Autocomplete
          id="AGENTE_COM"
          options={vendors}
          defaultValue={customer.AGENTE_COM}
          onChange={(e, newValue) => handleChange(newValue, "AGENTE_COM")}
          getOptionLabel={(option) => option.NOMBRE}
          renderInput={(params) => (
            <TextField
              variant="standard"
              fullWidth
              {...params}
              autoComplete="off"
              label="Agente Comercial"
              inputProps={{
                ...params.inputProps,
                autoComplete: "new-password",
              }}
            />
          )}
        />
        <Autocomplete
          id="AGENTE_COM"
          options={vendors}
          defaultValue={customer.AGENTE_COM}
          onChange={(e, newValue) => handleChange(newValue, "AGENTE_COM")}
          getOptionLabel={(option) => option.NOMBRE}
          renderInput={(params) => (
            <TextField
              variant="standard"
              fullWidth
              {...params}
              autoComplete="off"
              label="Agente Comercial"
              inputProps={{
                ...params.inputProps,
                autoComplete: "new-password",
              }}
            />
          )}
        />
      </Grid>
      <Grid item md={6} xs={12}>
        <TextField
          defaultValue={customer.foreignAccount}
          onChange={(e) => handleChange(e.target.value, "foreignAccount")}
          id="foreignAccount"
          label="Cuenta Extranjera"
          variant="standard"
          fullWidth
        />
        <TextField
          defaultValue={customer.foreignpaymentMethod}
          onChange={(e) => handleChange(e.target.value, "foreignpaymentMethod")}
          id="foreignPaymentMethod"
          label="Método de Pago"
          variant="standard"
          fullWidth
        />
      </Grid>
    </Grid>
  ) : (
    <Loader />
  );
}
