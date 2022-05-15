import React, { useEffect, useState } from "react";
import firebase from "../utils/firebase";
import {
  Container,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

import AddPayrollCategory from "../components/AddPayrollCategory";
import AddPaymentMethod from "../components/AddPaymentMetod";
import AddPackaging from "../components/AddPackaging";

export default function Catalogs() {
  const [list, setlist] = useState([]);
  const [paymentmethods, setpaymentmethods] = useState([]);
  const [packagingType, setpackagingType] = useState([]);

  useEffect(() => {
    firebase.getCollection("payrollCategory").onSnapshot((snap) => {
      const data = snap.docs.map((doc) => doc.data());
      setlist(data);
    });
    firebase.getCollection("paymentmethods").onSnapshot((snap) => {
      const data = snap.docs.map((doc) => doc.data());
      setpaymentmethods(data);
    });
    firebase.getCollection("packagingType").onSnapshot((snap) => {
      const data = snap.docs.map((doc) => doc.data());
      setpackagingType(data);
    });
  }, []);

  return (
    <Container>
      <Grid container spacing={4}>
        <Grid component={Paper} item xs={12} md={6} lg={4}>
          <AddPayrollCategory />
          <Divider />
          <List dense={true}>
            {list.map((item, index) => (
              <ListItem key={index}>
                <ListItemText primary={item.name} />
                <ListItemSecondaryAction>
                  <IconButton
                    onDoubleClick={() =>
                      firebase.delete("payrollCategory", item.id, item)
                    }
                    edge="end"
                    aria-label="delete"
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid component={Paper} item xs={12} md={6} lg={4}>
          <AddPaymentMethod />
          <Divider />
          <List dense={true}>
            {paymentmethods.map((item, index) => (
              <ListItem key={index}>
                <ListItemText primary={`${item.clave} - ${item.description}`} />
                <ListItemSecondaryAction>
                  <IconButton
                    onDoubleClick={() =>
                      firebase.delete("paymentmethods", item.id, item)
                    }
                    edge="end"
                    aria-label="delete"
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid component={Paper} item xs={12} md={6} lg={4}>
          <AddPackaging />
          <Divider />
          <List dense={true}>
            {packagingType.map((item, index) => (
              <ListItem key={index}>
                <ListItemText primary={item.name} />
                <ListItemSecondaryAction>
                  <IconButton
                    onDoubleClick={() =>
                      firebase.delete("packagingType", item.id, item)
                    }
                    edge="end"
                    aria-label="delete"
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </Container>
  );
}
