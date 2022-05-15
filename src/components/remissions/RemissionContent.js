import React, { useEffect, useState } from "react";
import firebase from "../../utils/firebase";
import { css } from "@emotion/react";
import { Paper, TableCell } from "@material-ui/core";
import AddContent from "../AddContent";
import {
  Grid,
  IconButton,
  Table,
  TableBody,
  TableHead,
  TableRow,
} from "@mui/material";
import numeral from "numeral";
import _ from "lodash";

import DeleteIcon from "@mui/icons-material/Delete";

export default function RemissionContent({ id, from, to, list }) {
  const freight = _.reduce(
    list,
    (sum, n) => {
      return sum + n.price;
    },
    0
  );
  const iva = freight * 0.16;
  // const retencion = freight * 0.04;
  const total = freight + iva;

  return (
    <Paper
      css={css`
        margin-top: 1rem;
      `}
      component={Grid}
      container
    >
      <Grid item md={4} sm={12}>
        <AddContent from={from} to={to} remissionId={id} />
      </Grid>
      <Grid item md={8} sm={12}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Cantidad</TableCell>
              <TableCell>Embalaje</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Peso</TableCell>
              <TableCell>M3</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map((item) => (
              <TableRow>
                <TableCell>
                  <IconButton
                    onClick={() =>
                      firebase.delete(`remissions/${id}/content`, item.id, item)
                    }
                    color="primary"
                    variant="contained"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
                <TableCell>{numeral(item.quantity).format("0.00")}</TableCell>
                <TableCell>{item.packaging}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>{numeral(item.weight).format("0.00")}</TableCell>
                <TableCell>{numeral(item.m3).format("0.00")}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan="4"></TableCell>
              <TableCell>Flete</TableCell>
              <TableCell>{numeral(freight).format("$0,0.00")}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan="4"></TableCell>
              <TableCell>Seguro</TableCell>
              <TableCell>{numeral(0).format("$0,0.00")}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan="4"></TableCell>
              <TableCell>Man Carga</TableCell>
              <TableCell>{numeral(0).format("$0,0.00")}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan="4"></TableCell>
              <TableCell>Man Descarga</TableCell>
              <TableCell>{numeral(0).format("$0,0.00")}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan="4"></TableCell>
              <TableCell>Recolección</TableCell>
              <TableCell>{numeral(0).format("$0,0.00")}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan="4"></TableCell>
              <TableCell>Reparto</TableCell>
              <TableCell>{numeral(0).format("$0,0.00")}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan="4"></TableCell>
              <TableCell>Otros</TableCell>
              <TableCell>{numeral(0).format("$0,0.00")}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan="4"></TableCell>
              <TableCell>Subtotal</TableCell>
              <TableCell>{numeral(freight).format("$0,0.00")}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan="4"></TableCell>
              <TableCell>IVA 16%</TableCell>
              <TableCell>{numeral(iva).format("$0,0.00")}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan="4"></TableCell>
              <TableCell>Retención 4%</TableCell>
              <TableCell>{numeral(0).format("$0,0.00")}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan="4"></TableCell>
              <TableCell>Total</TableCell>
              <TableCell>{numeral(total).format("$0,0.00")}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Grid>
    </Paper>
  );
}
