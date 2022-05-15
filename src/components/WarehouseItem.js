import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import firebase from "../utils/firebase";
import { css } from "@emotion/core";

export default function WarehouseItem({ id, index }) {
  const [warehouse, setwarehouse] = useState({});

  useEffect(() => {
    if (id) {
      firebase
        .getDocument("warehouse", id)
        .get()
        .then((snap) => {
          if (snap.exists) {
            setwarehouse(snap.data());
          }
        });
    }
  }, [id]);

  return (
    <span
      css={css`
        text-decoration: none;
        color: black;
      `}
    >
      {warehouse[index ? index : "name"]}
    </span>
  );
}
