import React, { useState, useEffect } from "react";
import firebase from "../utils/firebase";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  Typography,
} from "@material-ui/core";
import { css } from "@emotion/core";
import moment from "moment";

export default function AddPayment({ data }) {
  const [date, setdate] = useState("");
  const [reference, setreference] = useState("");
  const [amount, setamount] = useState("");

  useEffect(() => {
    const today = moment().format("YYYY-MM-DD");
    setdate(today);
  }, []);

  return (
    <div
      css={css`
        padding: 1rem;
      `}
    >
      <Typography align="center" variant="h4">
        Agregar Pago
      </Typography>
      <TextField
        label="Fecha de Pago"
        fullWidth
        value={date ? date : ""}
        onChange={(e) => setdate(e.target.value)}
        type="date"
        css={css`
          margin-top: 1rem;
        `}
      />
      <TextField
        label="Referencia"
        fullWidth
        value={reference ? reference : ""}
        onChange={(e) => setreference(e.target.value)}
        css={css`
          margin-bottom: 1rem;
        `}
        type="text"
      />
      <TextField
        label="Monto"
        fullWidth
        value={amount ? amount : ""}
        onChange={(e) => setamount(e.target.value)}
        css={css`
          margin-bottom: 1rem;
        `}
        type="number"
      />
      <Button
        onClick={handleSubmit}
        fullWidth
        color="secondary"
        variant="outlined"
      >
        Agregar
      </Button>
    </div>
  );

  async function handleSubmit() {
    try {
      if (data.invoice) {
        if (data.invoice.status === "valid") {
          if (date && amount) {
            const item = {
              date: moment(date, "YYYY-MM-DD").valueOf(),
              isoDate: moment(date, "YYYY-MM-DD").toISOString(),
              type: "abono",
              concept: `Pago de factura ${data.invoice.date}`,
              amount: Number(amount),
              remission: data.id,
              uuid: data.invoice.id,
              reference,
            };
            firebase.simpleAdd(item, `finance-moves`).then(() => {
              alert("Movimiento agregado");
              setamount("");
              setreference("");
            });
          } else {
            alert("Completa todos los campos para continuar");
          }
        } else {
          alert("No puedes agregar pagos a facturas canceladas");
        }
      } else {
        alert("No puedes agregar un pago a una remisión sin factura");
      }
    } catch (error) {
      alert(error.message);
    }
  }
}
