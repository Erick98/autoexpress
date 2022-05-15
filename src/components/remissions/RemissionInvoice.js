import React from "react";
import axios from "axios";
import { Button, ButtonGroup } from "@material-ui/core";
import firebase from "../../utils/firebase";
import fileDownload from "js-file-download";

export default function RemissionInvoice({ data, customer, content }) {
  const handleInvoice = async () => {
    const list = content.map((item, index) => ({
      quantity: 1,
      discount: 0,
      product: {
        description: item.description,
        product_key: "01010101",
        price: item.price,
        tax_included: false,
        conditions: customer.daysCredit ? Number(customer.daysCredit) : null,
      },
    }));
    const invoiceData = {
      legalName: customer.name,
      email: customer.email,
      rfc: customer.rfc,
      items: list,
      paymentForm: data.paymentmethod,
    };
    const resp = await axios.get(
      "http://localhost:8080/api/facturapi/createinvoice",
      {
        params: {
          data: JSON.stringify(invoiceData),
        },
      }
    );
    firebase.update("remissions", data.id, "invoice", resp.data).then(() => {
      alert("Factura Creada");
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

  return (
    <div>
      {data.invoice && data.invoice.status !== "valid" && (
        <p>Factura cancelada</p>
      )}
      {data.invoice ? (
        <ButtonGroup
          variant="text"
          color="primary"
          aria-label="contained primary button group"
        >
          <Button onClick={sendInvoice}>Enviar factura</Button>
          <Button onClick={downloadInvoice}>Descargar factura</Button>
          <Button onClick={cancelInvoice}>Cancelar Factura</Button>
        </ButtonGroup>
      ) : (
        <ButtonGroup
          variant="text"
          color="primary"
          aria-label="contained primary button group"
        >
          <Button onClick={handleInvoice}>Timbrar factura</Button>
        </ButtonGroup>
      )}
    </div>
  );
}
