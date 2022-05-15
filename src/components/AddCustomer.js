import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import firebase from "../utils/firebase";
import {
  Button,
  FormControl,
  InputLabel,
  Select,
  TextField,
} from "@material-ui/core";
import { css } from "@emotion/core";
import rfcValido from "../utils/validar_rfc";
import XMLParser from "react-xml-parser";
import _ from "lodash";

export default function AddCustomer() {
  const history = useHistory();
  const [state, setstate] = useState({});
  const [regimenes, setregimenes] = useState([]);
  const [cps, setcps] = useState([]);

  useEffect(() => {
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
    fetch("/resources/CAT_CODIGO_POSTAL.xml")
      .then((res) => res.text())
      .then((data) => {
        var xml = new XMLParser().parseFromString(data);
        var pre = xml.children;
        const result = pre.map((item) => ({
          c_CodigoPostal: item.attributes.c_CodigoPostal,
          c_Estado: item.attributes.c_Estado,
          c_Municipio: item.attributes.c_Municipio,
          c_Localidad: item.attributes.c_Localidad,
        }));
        setcps(result);
      });
  }, []);

  const handleChange = (index, value) => {
    var newState = { ...state };
    newState[index] = value;
    setstate(newState);
  };

  // console.log(rfcValido("BENE980920DL"));

  return (
    <>
      <h3>Nuevo Cliente</h3>
      <FormControl
        css={css`
          margin-top: 0rem;
        `}
        fullWidth
        variant="outlined"
      >
        <InputLabel htmlFor="ID_REGIMEN_F">Régimen Fiscal</InputLabel>
        <Select
          native
          value={state.ID_REGIMEN_F}
          onChange={(e) => handleChange("ID_REGIMEN_F", e.target.value)}
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
        label="Nombre de persona o razón social"
        value={state.RAZON_SOCIAL}
        fullWidth
        variant="outlined"
        onChange={(e) => handleChange("RAZON_SOCIAL", e.target.value)}
        css={css`
          margin-top: 1rem;
        `}
      />
      <TextField
        label="RFC"
        value={state.RFC}
        fullWidth
        variant="outlined"
        onChange={(e) => handleChange("RFC", e.target.value)}
        css={css`
          margin-top: 1rem;
        `}
      />
      <TextField
        label="Código Postal"
        value={state.CP}
        fullWidth
        variant="outlined"
        onChange={(e) => handleChange("CP", e.target.value)}
        css={css`
          margin-top: 1rem;
        `}
      />
      <TextField
        label="Correo Principal"
        value={state.CORREO}
        fullWidth
        variant="outlined"
        onChange={(e) => handleChange("CORREO", e.target.value)}
        css={css`
          margin-top: 1rem;
        `}
      />
      <TextField
        label="Correo Facturación"
        value={state.CORREO_FACTURACION}
        fullWidth
        variant="outlined"
        onChange={(e) => handleChange("CORREO_FACTURACION", e.target.value)}
        css={css`
          margin-top: 1rem;
        `}
      />
      <TextField
        label="Teléfono"
        value={state.TELEFONO}
        fullWidth
        variant="outlined"
        onChange={(e) => handleChange("TELEFONO", e.target.value)}
        css={css`
          margin-top: 1rem;
        `}
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
        Agregar
      </Button>
    </>
  );

  async function handleSubmit() {
    try {
      if (
        state.ID_REGIMEN_F &&
        state.RAZON_SOCIAL &&
        state.RFC &&
        state.CP &&
        state.CORREO &&
        state.CORREO_FACTURACION &&
        state.TELEFONO
      ) {
        firebase
          .getCollection("customers")
          .where("email", "==", state.RAZON_SOCIAL)
          .get()
          .then((snap) => {
            if (snap.empty) {
              firebase
                .getCollection("customers")
                .where("RFC", "==", state.RFC)
                .get()
                .then((snap) => {
                  if (snap.empty) {
                    firebase
                      .getCollection("customers")
                      .where("CORREO", "==", state.CORREO)
                      .get()
                      .then((snap) => {
                        if (snap.empty) {
                          firebase
                            .getCollection("customers")
                            .where("TELEFONO", "==", state.TELEFONO)
                            .get()
                            .then((snap) => {
                              if (snap.empty) {
                                var newState = { ...state };
                                const findRegimen = _.find(
                                  regimenes,
                                  function (o) {
                                    return (
                                      o.c_RegimenFiscal === state.ID_REGIMEN_F
                                    );
                                  }
                                );
                                newState.REFIMEN_F = findRegimen.Descripcion;
                                const findCp = _.find(cps, function (o) {
                                  return o.c_CodigoPostal === state.CP;
                                });
                                console.log(findCp);
                                if (findCp !== undefined) {
                                  newState.ID_CP = findCp.c_CodigoPostal;
                                  console.log(rfcValido(state.RFC));
                                  if (rfcValido(state.RFC)) {
                                    console.log("valido RFC");
                                    firebase
                                      .simpleAdd(newState, "customers")
                                      .then((id) => {
                                        history.push(`/ventas/clientes/${id}`);
                                      });
                                  } else {
                                    alert("El RFC ingresado no es válido");
                                  }
                                } else {
                                  alert("Código Postal inválido");
                                }
                              } else {
                                alert("Estiste un cliente con ese teléfono");
                              }
                            });
                        } else {
                          alert("Existe un cliente con ese correo");
                        }
                      });
                  } else {
                    alert("Existe un cliente con ese rfc");
                  }
                });
            } else {
              alert("Existe un cliente con esa razón social");
            }
          });
      } else {
        alert("Completa todos los datos para continuar");
      }
    } catch (error) {
      alert(error.message);
    }
  }
}
