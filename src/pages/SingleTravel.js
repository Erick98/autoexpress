import React, { useEffect, useState } from "react";
import firebase from "../utils/firebase";
import {
  Checkbox,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import Loader from "../components/Loader";
import { ListItemButton } from "@mui/material";
import moment from "moment";
import _ from "lodash";

const Item = ({ value, travelId }) => {
  const [customer, setcustomer] = useState({});

  useEffect(() => {
    if (value.customer) {
      firebase.getDocument("customers", value.customer).onSnapshot((snap) => {
        setcustomer(snap.data());
      });
    }
  }, [value.customer]);

  return (
    <ListItem component={Grid} item xs={12} md={6} disablePadding>
      <ListItemButton
        role={undefined}
        onClick={() =>
          firebase.update(
            "remissions",
            value.id,
            "travel",
            value.travel === travelId ? null : travelId
          )
        }
        dense
      >
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={value.travel === travelId}
            disableRipple
            inputProps={{ "aria-labelledby": value.id }}
          />
        </ListItemIcon>
        <div>
          <ListItemText secondary={value.folio} primary={`Folio`} />
          <ListItemText
            secondary={moment(value.date).format("DD-MM-YYYY")}
            primary={`Fecha`}
          />
          <ListItemText secondary={customer.name} primary={`Cliente`} />
        </div>
      </ListItemButton>
    </ListItem>
  );
};

export default function SingleTravel(props) {
  const { id } = props.match.params;
  const [travel, settravel] = useState(null);
  const [remissions, setremissions] = useState([]);

  useEffect(() => {
    firebase
      .getDocument("travels", id)
      .get()
      .then((snap) => {
        const data = snap.data();
        settravel(data);
      });
    firebase.getCollection("remissions").onSnapshot((snap) => {
      const data = snap.docs.map((doc) => doc.data());
      const filtered = _.filter(data, (o) => {
        return o.travel === null || o.travel === id || o.travel === undefined;
      });
      setremissions(filtered);
    });
  }, [id]);

  return travel ? (
    <Container>
      <h3>Detalle de Viaje</h3>
      <List>
        <ListItem>
          <b>Foio: </b>
          {` `}
          <span>{travel.folio}</span>
        </ListItem>
        <ListItem>
          <b>Vehículo: </b>
          <span>{travel.vehicle}</span>
        </ListItem>
        <ListItem>
          <b>Chofer: </b>
          <span>{travel.driver}</span>
        </ListItem>
        <ListItem>
          <b>Fecha: </b>
          <span>{travel.date}</span>
        </ListItem>
        <ListItem>
          <b>Salida: </b>
          <span>{travel.from}</span>
        </ListItem>
        <ListItem>
          <b>Destino: </b>
          <span>{travel.to}</span>
        </ListItem>
      </List>
      <Divider />
      <h3>Seleccionar Remisiones</h3>
      <List component={Grid} gap={4} container>
        {remissions.map((item) => (
          <Item key={item.id} value={item} travelId={id} />
        ))}
      </List>
    </Container>
  ) : (
    <Loader />
  );
}
