import React, { useEffect, useState } from "react";
import firebase from "../utils/firebase";
import {
  FormControl,
  InputLabel,
  Button,
  Select,
  Grid,
} from "@material-ui/core";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { css } from "@emotion/core";
import Loader from "../components/Loader";
import XMLParser from "react-xml-parser";
import _ from "lodash";

import SingleCustomerGeneralsEstado from "../components/single-customer-generals-fields/SingleCustomerGeneralsEstado";
import SingleCustomerGeneralsMunicipio from "../components/single-customer-generals-fields/SingleCustomerGeneralsMunicipio";
import SingleCustomerGeneralsLocalidad from "../components/single-customer-generals-fields/SingleCustomerGeneralsLocalidad";
import SingleCustomerGeneralsCP from "../components/single-customer-generals-fields/SingleCustomerGeneralsCP";
import SingleCustomerGeneralsColonia from "../components/single-customer-generals-fields/SingleCustomerGeneralsColonia";

export default function SingleCustomerGenerals(props) {
  const { id } = props.match.params;
  const [customer, setcustomer] = useState(null);
  const [newCustomer, setnewCustomer] = useState({});
  const [regimenes, setregimenes] = useState([]);
  const [estados, setestados] = useState([]);
  const [paises, setpaises] = useState([]);
  const [permisos, setpermisos] = useState([]);

  const haveChanges = _.isEqual(customer, newCustomer);

  useEffect(() => {
    firebase
      .getDocument("customers", id)
      .get()
      .then((snap) => {
        const data = snap.data();
        setcustomer(data);
        setnewCustomer(data);
      });
    fetch("/resources/CAT_REGIMENFISCAL40.xml")
      .then((res) => res.text())
      .then((data) => {
        var xml = new XMLParser().parseFromString(data);
        var pre = xml.children;
        const result = pre.map((item) => ({
          c_RegimenFiscal: item.attributes.c_RegimenFiscal,
          Descripcion: item.attributes.Descripcion,
          Fisica: item.attributes.Fisica,
          Moral: item.attributes.Moral,
        }));
        setregimenes(result);
      });
    fetch("/resources/CAT_ESTADOS.xml")
      .then((res) => res.text())
      .then((data) => {
        var xml = new XMLParser().parseFromString(data);
        var pre = xml.children;
        const result = pre.map((item) => ({
          Clave: item.attributes.Clave,
          Pais: item.attributes.Pais,
          Descripcion: item.attributes.Descripcion,
        }));
        setestados(result);
      });
    fetch("/resources/CAT_PAIS.xml")
      .then((res) => res.text())
      .then((data) => {
        var xml = new XMLParser().parseFromString(data);
        var pre = xml.children;
        const result = pre.map((item) => ({
          c_Pais: item.attributes.c_Pais,
          Descripcion: item.attributes.Descripcion,
        }));
        setpaises(result);
      });
    fetch("/resources/CAT_TIPO_PERMISO.xml")
      .then((res) => res.text())
      .then((data) => {
        var xml = new XMLParser().parseFromString(data);
        var pre = xml.children;
        const result = pre.map((item) => ({
          Clave: item.attributes.Clave,
          Descripcion: item.attributes.Descripcion,
          CveTransporte: item.attributes.CveTransporte,
        }));
        setpermisos(result);
      });
  }, [id]);

  const handleChange = (val, index) => {
    var newState = { ...newCustomer };
    newState[index] = val ? val : "";
    setnewCustomer(newState);
  };

  return customer && newCustomer ? (
    <Grid container spacing={2}>
      <Grid item md={6} sm={12}>
        <FormControl
          css={css`
            margin-top: 0rem;
          `}
          fullWidth
        >
          <InputLabel htmlFor="ID_REGIMEN_F">Régimen Fiscal</InputLabel>
          <Select
            native
            defaultValue={customer.ID_REGIMEN_F}
            onChange={(e) => handleChange(e.target.value, "ID_REGIMEN_F")}
            label="RÉGIMEN FISCAL"
            inputProps={{
              name: "ID_REGIMEN_F",
              id: "ID_REGIMEN_F",
            }}
          >
            <option aria-label="None" value="" />
            {regimenes.map((item, index) => (
              <option key={index} value={item.c_RegimenFiscal}>
                {item.Descripcion}
              </option>
            ))}
          </Select>
        </FormControl>
        <TextField
          defaultValue={customer.RAZON_SOCIAL}
          onChange={(e) => handleChange(e.target.value, "RAZON_SOCIAL")}
          id="RAZON_SOCIAL"
          label="Razón Social"
          variant="standard"
          fullWidth
          autoComplete="off"
        />
        <TextField
          defaultValue={customer.NOMBRE_COMERCIAL}
          onChange={(e) => handleChange(e.target.value, "NOMBRE_COMERCIAL")}
          id="NOMBRE_COMERCIAL"
          label="Nombre Comercial"
          variant="standard"
          fullWidth
          autoComplete="off"
        />
        <TextField
          defaultValue={customer.RFC}
          onChange={(e) => handleChange(e.target.value, "RFC")}
          id="RFC"
          label="RFC"
          variant="standard"
          fullWidth
          autoComplete="off"
        />
        <Autocomplete
          id="PAIS"
          options={paises}
          defaultValue={customer.PAIS}
          onChange={(e, newValue) => handleChange(newValue, "PAIS")}
          getOptionLabel={(option) => option.Descripcion}
          renderInput={(params) => (
            <TextField
              variant="standard"
              fullWidth
              {...params}
              autoComplete="off"
              label="País"
              inputProps={{
                ...params.inputProps,
                autoComplete: "new-password",
              }}
            />
          )}
        />
        <SingleCustomerGeneralsEstado
          id="ESTADO"
          options={estados}
          defaultValue={customer.ESTADO}
          handleChange={handleChange}
          getOptionLabel={(option) => option.Descripcion}
          newCustomer={newCustomer}
        />
        <SingleCustomerGeneralsLocalidad
          id="LOCALIDAD"
          defaultValue={customer.LOCALIDAD}
          handleChange={handleChange}
          getOptionLabel={(option) => option.Descripcion}
          newCustomer={newCustomer}
        />
        <SingleCustomerGeneralsMunicipio
          id="MUNICIPIO"
          defaultValue={customer.MUNICIPIO}
          handleChange={handleChange}
          getOptionLabel={(option) => option.Descripcion}
          newCustomer={newCustomer}
        />
        <SingleCustomerGeneralsCP
          id="CP"
          defaultValue={customer.CP}
          handleChange={handleChange}
          getOptionLabel={(option) => option.c_CodigoPostal}
          newCustomer={newCustomer}
        />
        <SingleCustomerGeneralsColonia
          id="COLONA"
          defaultValue={customer.COLONIA}
          handleChange={handleChange}
          getOptionLabel={(option) => option.Descripcion}
          newCustomer={newCustomer}
        />
        <TextField
          defaultValue={customer.CALLE}
          onChange={(e) => handleChange(e.target.value, "CALLE")}
          id="CALLE"
          label="Calle"
          variant="standard"
          fullWidth
          inputProps={{
            autoComplete: "new-password",
          }}
        />
        <TextField
          defaultValue={customer.NUMERO_EXT}
          onChange={(e) => handleChange(e.target.value, "NUMERO_EXT")}
          id="NUMERO_EXT"
          label="Número Exterior"
          variant="standard"
          fullWidth
          inputProps={{
            autoComplete: "new-password",
          }}
        />
        <TextField
          defaultValue={customer.NUMERO_INT}
          onChange={(e) => handleChange(e.target.value, "NUMERO_INT")}
          id="NUMERO_INT"
          label="Número Interior"
          variant="standard"
          fullWidth
          inputProps={{
            autoComplete: "new-password",
          }}
        />
        <TextField
          defaultValue={customer.ENTRE_CALLES_1}
          onChange={(e) => handleChange(e.target.value, "ENTRE_CALLES_1")}
          id="ENTRE_CALLES_1"
          label="Entre Calles 1"
          variant="standard"
          fullWidth
          inputProps={{
            autoComplete: "new-password",
          }}
        />
        <TextField
          defaultValue={customer.ENTRE_CALLES_2}
          onChange={(e) => handleChange(e.target.value, "ENTRE_CALLES_2")}
          id="ENTRE_CALLES_2"
          label="Entre Calles 2"
          variant="standard"
          fullWidth
          inputProps={{
            autoComplete: "new-password",
          }}
        />
      </Grid>
      <Grid item md={6} sm={12}>
        <TextField
          defaultValue={customer.CORREO_FACTURACION}
          onChange={(e) => handleChange(e.target.value, "CORREO_FACTURACION")}
          id="CORREO_FACTURACION"
          label="Correo de Facturación"
          variant="standard"
          fullWidth
          inputProps={{
            autoComplete: "new-password",
          }}
        />
        <Autocomplete
          id="TIPO_PERMISO"
          options={permisos}
          defaultValue={customer.TIPO_PERMISO}
          onChange={(e, newValue) => handleChange(newValue, "TIPO_PERMISO")}
          getOptionLabel={(option) => option.Descripcion}
          renderInput={(params) => (
            <TextField
              variant="standard"
              fullWidth
              {...params}
              autoComplete="off"
              label="Tipo de Permiso"
              inputProps={{
                ...params.inputProps,
                autoComplete: "new-password",
              }}
            />
          )}
        />
        {/* <TextField
          defaultValue={customer.status}
          onChange={(e) => handleChange(e.target.value, "status")}
          id="status"
          label="Estatus"
          variant="standard"
          fullWidth
        /> */}
      </Grid>
      <Button
        css={css`
          position: fixed;
          bottom: 1rem;
          right: 1rem;
        `}
        disabled={haveChanges}
        variant="contained"
        color="primary"
        onClick={handleSave}
      >
        Guardar Cambios
      </Button>
    </Grid>
  ) : (
    <Loader />
  );

  async function handleSave() {
    try {
      await firebase.firestore
        .collection("customers")
        .doc(id)
        .update(newCustomer)
        .then(() => {
          alert("Cambios guardados");
        });
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  }
}
