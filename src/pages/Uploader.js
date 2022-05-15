import React, { useState, useEffect } from "react";
import firebase from "../utils/firebase";
import { Button } from "@material-ui/core";
import { css } from "@emotion/core";
import XMLParser from "react-xml-parser";
import _ from "lodash";

export default function Uploader() {
  const [list, setlist] = useState([]);

  useEffect(() => {
    // fetch("/resources/CAT_LOCALIDAD.xml")
    //   .then((res) => res.text())
    //   .then((data) => {
    //     var xml = new XMLParser().parseFromString(data);
    //     var pre = xml.children;
    //     const result = pre.map((item) => ({
    //       Clave: item.attributes.Clave,
    //       Estado: item.attributes.Estado,
    //       Descripcion: item.attributes.Descripcion,
    //     }));
    //     setlist(result);
    //   });
    firebase
      .getCollection("localidades")
      .get()
      .then((snap) => {
        console.log(snap.size);
      });
  }, []);

  return (
    <>
      <h3>Uploader</h3>
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
      list.forEach((item, index) => {
        firebase.simpleAdd(item, "localidades");
      });
    } catch (error) {
      alert(error.message);
    }
  }
}
