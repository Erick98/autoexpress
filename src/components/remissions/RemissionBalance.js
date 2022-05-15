import {
  Button,
  ButtonGroup,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import numeral from "numeral";
import React, { useEffect, useState } from "react";
import firebase from "../../utils/firebase";
import _ from "lodash";
import Modal from "../Modal";
import AddPayment from "../AddPayment";
import { css } from "@emotion/react";
import AddIcon from "@material-ui/icons/Add";
import moment from "moment";
import axios from "axios";

export default function RemissionBalance({ content, data, customer }) {
  const [payments, setpayments] = useState([]);
  const [modalOpen, setmodalOpen] = useState(false);

  const freight = _.reduce(
    content,
    (sum, n) => {
      return sum + n.price;
    },
    0
  );
  const iva = freight * 0.16;
  const total = freight + iva;

  const totalPayments = _.reduce(
    payments,
    (sum, n) => {
      return sum + n.amount;
    },
    0
  );

  const handleInvoice = async () => {
    const list = payments.map((item) => ({
      date: item.isoDate,
      payment_form: data.paymentmethod,
      related: [
        {
          uuid: data.invoice.uuid,
          amount: item.amount,
          installment: 1,
          last_balance: total,
        },
      ],
    }));
    const invoiceData = {
      legalName: customer.name,
      email: customer.email,
      rfc: customer.rfc,
      items: list,
    };
    const resp = await axios.get(
      "http://localhost:8080/api/facturapi/createpaymentinvoice",
      {
        params: {
          data: JSON.stringify(invoiceData),
        },
      }
    );
    firebase
      .update("remissions", data.id, "paymentInvoice", resp.data)
      .then(() => {
        alert("Complemento Creado");
      });
  };
  const sendInvoice = async () => {
    await axios
      .get("http://localhost:8080/api/facturapi/sendinvoice", {
        params: {
          id: data.invoice.id,
        },
      })
      .then(() => {
        alert("Factura enviada por correo electrónico");
      });
  };
  const downloadInvoice = async () => {
    axios({
      url: "http://localhost:8080/api/facturapi/invoicedownloader",
      method: "GET",
      responseType: "blob",
      params: {
        id: data.invoice.id,
      },
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "factura.zip"); //or any other extension
      document.body.appendChild(link);
      link.click();
    });
  };

  const cancelInvoice = async () => {
    const resp = await axios.get(
      "http://localhost:8080/api/facturapi/cancelinvoice",
      {
        params: {
          id: data.invoice.id,
        },
      }
    );
    console.log(resp.data);
    firebase.update("remissions", data.id, "invoice", resp.data).then(() => {
      alert("Factura Cancelada");
    });
  };

  useEffect(() => {
    firebase
      .getCollection("finance-moves")
      .where("remission", "==", data.id)
      .onSnapshot((snap) => {
        const data = snap.docs.map((doc) => doc.data());
        setpayments(data);
      });
  }, []);

  return (
    <>
      <div
        css={css`
          width: 100%;
          display: flex;
        `}
      >
        {data.invoice && (
          <Button
            onClick={() => setmodalOpen(true)}
            css={css`
              margin-left: auto;
            `}
            color="secondary"
            variant="contained"
            size="small"
          >
            <AddIcon
              css={css`
                margin-right: 0.5rem;
              `}
            />{" "}
            Agregar Pago
          </Button>
        )}
      </div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Total de Remisión</TableCell>
            <TableCell>{numeral(total).format("$0,0.00")}</TableCell>
            <TableCell>Remanente</TableCell>
            <TableCell>
              {numeral(total - totalPayments).format("$0,0.00")}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Pagos</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Fecha de Pago</TableCell>
            <TableCell>Concepto de Pago</TableCell>
            <TableCell>Referencia</TableCell>
            <TableCell>Monto</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {payments.map((item) => (
            <TableRow>
              <TableCell>{moment(item.date).format("DD-MM-YYYY")}</TableCell>
              <TableCell>{item.concept}</TableCell>
              <TableCell>{item.reference}</TableCell>
              <TableCell>{numeral(item.amount).format("$0,0.00")}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div
        css={css`
          width: 100%;
        `}
      >
        {data.paymentInvoice ? (
          <ButtonGroup
            variant="text"
            color="primary"
            aria-label="contained primary button group"
          >
            <Button onClick={sendInvoice}>Enviar Complemento</Button>
            <Button onClick={downloadInvoice}>Descargar Complemento</Button>
            <Button onClick={cancelInvoice}>Cancelar Complemento</Button>
          </ButtonGroup>
        ) : (
          <ButtonGroup
            variant="text"
            color="primary"
            aria-label="contained primary button group"
          >
            <Button onClick={handleInvoice}>Emitir complemento de pago</Button>
          </ButtonGroup>
        )}
      </div>
      <Modal open={modalOpen} handleClose={() => setmodalOpen(null)}>
        <AddPayment data={data} />
      </Modal>
    </>
  );
}
