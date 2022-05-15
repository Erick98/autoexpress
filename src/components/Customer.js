import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import firebase from "../utils/firebase";
import { css } from "@emotion/core";

export default function Customer({ id, index }) {
  const [customer, setcustomer] = useState({});

  useEffect(() => {
    if (id) {
      firebase
        .getDocument("customers", id)
        .get()
        .then((snap) => {
          if (snap.exists) {
            setcustomer(snap.data());
          }
        });
    }
  }, [id]);

  return (
    <Link
      css={css`
        text-decoration: none;
        color: black;
      `}
      to={`/ventas/clientes/${id}`}
    >
      {customer[index ? index : "name"]}
    </Link>
  );
}
