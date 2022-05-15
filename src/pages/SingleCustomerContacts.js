import React, { useEffect, useState } from "react";
import firebase from "../utils/firebase";
import {
  Button,
  Container,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  ListItem,
  List,
  IconButton,
  ListItemAvatar,
  TextField,
  Grid,
  Avatar,
  ListItemText,
} from "@material-ui/core";
import { css } from "@emotion/core";
import Loader from "../components/Loader";
import Modal from "../components/Modal";
import AddressSetter from "../components/AddressSetter";

export default function SingleCustomerContacts() {
  const { id } = props.match.params;
  const [customer, setcustomer] = useState(null);
  const [newCustomer, setnewCustomer] = useState(null);
  const [modalOpen, setmodalOpen] = useState(false);
  const [address, setaddress] = useState([]);

  const handleUpdate = (index, val) => {
    firebase.update("customers", id, index, val);
  };

  useEffect(() => {
    firebase
      .getDocument("customers", id)
      .get()
      .then((snap) => {
        const data = snap.data();
        setcustomer(data);
        setnewCustomer(data);
      });
    firebase.getCollection(`/customers/${id}/address`).onSnapshot((snap) => {
      const data = snap.docs.map((doc) => doc.data());
      setaddress(data);
    });
  }, [id]);

  const handleChange = (val, index) => {
    var newState = { ...newCustomer };
    newState[index] = val;
    setnewCustomer(newState);
  };

  return (
    <>
      <TextField
        defaultValue={customer.email}
        onChange={(e) => handleChange(e.target.value, "email")}
        id="email"
        label="Principal"
        variant="standard"
        fullWidth
      />
      <TextField
        defaultValue={customer.emailinvoices}
        onChange={(e) => handleChange(e.target.value, "emailinvoices")}
        id="emailinvoices"
        label="Facturas"
        variant="standard"
        fullWidth
      />
      <TextField
        defaultValue={customer.collectionemail}
        onChange={(e) => handleChange(e.target.value, "collectionemail")}
        id="collectionemail"
        label="Cobranza"
        variant="standard"
        fullWidth
      />
      <TextField
        defaultValue={customer.trafficemail}
        onChange={(e) => handleChange(e.target.value, "trafficemail")}
        id="trafficemail"
        label="Trafico"
        variant="standard"
        fullWidth
      />
      <TextField
        defaultValue={customer.warehouseemail}
        onChange={(e) => handleChange(e.target.value, "warehouseemail")}
        id="warehouseemail"
        label="Almacen"
        variant="standard"
        fullWidth
      />
      <TextField
        defaultValue={customer.evidenciemail}
        onChange={(e) => handleChange(e.target.value, "evidenciemail")}
        id="evidenciemail"
        label="Evidencias"
        variant="standard"
        fullWidth
      />
      <TextField
        defaultValue={customer.dieselemail}
        onChange={(e) => handleChange(e.target.value, "dieselemail")}
        id="dieselemail"
        label="Diesel"
        variant="standard"
        fullWidth
      />
    </>
  );
}
