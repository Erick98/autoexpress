import React, { useState } from "react";
import {
  InputLabel,
  Paper,
  Select,
  TableCell,
  TextField,
} from "@material-ui/core";
import moment from "moment";
import { css } from "@emotion/core";
import Customer from "../Customer";
import {
  FormControl,
  MenuItem,
  Table,
  TableBody,
  TableRow,
  Button,
} from "@mui/material";

import WarehouseSetter from "../WarehouseSetter";
import AddressSetter from "../AddressSetter";
import Modal from "../Modal";
import RemissionContent from "./RemissionContent";

export default function RemissionDetail({
  remission,
  id,
  paymentmethods,
  handleUpdate,
  warehouse,
  content,
}) {
  const [modalOpen, setmodalOpen] = useState(null);
  return (
    <>
      <Table
        component={Paper}
        css={css`
          table-layout: fixed;
        `}
      >
        <TableBody>
          <TableRow>
            <TableCell>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Método de Pago
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={remission.paymentmethod}
                  label="Age"
                  onChange={(e) =>
                    handleUpdate("paymentmethod", e.target.value)
                  }
                >
                  {paymentmethods.map((item) => (
                    <MenuItem value={item.clave}>
                      {item.clave} - {item.description}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </TableCell>
            <TableCell>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Oficina Responsable
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={remission.warehouse}
                  label="Age"
                  onChange={(e) => handleUpdate("warehouse", e.target.value)}
                >
                  {warehouse.map((item) => (
                    <MenuItem value={item.id}>{item.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </TableCell>
            <TableCell>
              <TextField
                value={remission.declaratedValue}
                fullWidth
                onChange={(e) =>
                  handleUpdate("declaratedValue", e.target.value)
                }
                label="Valor Declarado"
                type="number"
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <label>Días de Crédito</label>
              <p>
                <Customer index="daysCredit" id={remission.customer} />
              </p>
            </TableCell>
            <TableCell>{/* Ver que es esto de Flete */}</TableCell>
            <TableCell>
              <TextField
                value={remission.folio}
                fullWidth
                onChange={(e) => handleUpdate("folio", e.target.value)}
                label="Folio"
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <label>Ruta</label>
              <p></p>
            </TableCell>
            <TableCell>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Oficina Salida
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={remission.from}
                  label="Age"
                  onChange={(e) => handleUpdate("from", e.target.value)}
                >
                  {warehouse.map((item) => (
                    <MenuItem value={item.index}>{item.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </TableCell>
            <TableCell>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Oficina Entrega
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={remission.to}
                  label="Age"
                  onChange={(e) => handleUpdate("to", e.target.value)}
                >
                  {warehouse.map((item) => (
                    <MenuItem value={item.index}>{item.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <TextField
                label="Fecha de servicio"
                value={moment(remission.date).format("YYYY-MM-DD")}
                fullWidth
                onChange={(e) =>
                  handleUpdate(
                    "date",
                    moment(e.target.value, "YYYY-MM-DD").valueOf()
                  )
                }
                type="date"
              />
            </TableCell>
            <TableCell>
              <label>Fecha de Creación</label>
              <p>{moment(remission.timestamp).format("DD-MM-YYYY")}</p>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Table
        component={Paper}
        css={css`
          table-layout: fixed;
          margin-top: 1rem;
        `}
      >
        <TableBody>
          <TableRow>
            <TableCell>
              <label>Cliente</label>
              <p>
                <Customer id={remission.customer} index="name" />
              </p>
            </TableCell>
            <TableCell>
              <label>RFC</label>
              <p>
                <Customer id={remission.customer} index="rfc" />
              </p>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <TextField
                value={remission.solicitor}
                fullWidth
                onChange={(e) => handleUpdate("solicitor", e.target.value)}
                label="Solicita"
              />
            </TableCell>
            <TableCell>
              <label>Usuario Documentador</label>
              <p>{remission.userEmail}</p>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Table
        component={Paper}
        css={css`
          table-layout: fixed;
          margin-top: 1rem;
        `}
      >
        <TableBody>
          <TableRow>
            <TableCell>
              <h3>Remitente</h3>
              <TextField
                value={remission.senderContact}
                fullWidth
                onChange={(e) => handleUpdate("senderContact", e.target.value)}
                label="Información de Contacto"
                helperText="Obligatorio"
              />
              <TextField
                value={remission.senderName}
                fullWidth
                onChange={(e) => handleUpdate("senderName", e.target.value)}
                label="Nombre de Remitente"
                helperText="En caso de ser diferente al nomble del cliente"
              />
              <TextField
                value={remission.senderRFC}
                fullWidth
                onChange={(e) => handleUpdate("senderRFC", e.target.value)}
                label="RFC de Remitente"
                helperText="En caso de ser diferente al nomble del cliente"
              />
              <TextField
                multiline
                rows={4}
                value={remission.senderComments}
                fullWidth
                onChange={(e) => handleUpdate("senderComments", e.target.value)}
                label="Comentarios"
                helperText="En caso de ser diferente al nomble del cliente"
                css={css`
                  margin-bottom: auto;
                `}
              />
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Tipo de Recolección
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={remission.senderType}
                  label="Age"
                  onChange={(e) => handleUpdate("senderType", e.target.value)}
                >
                  <MenuItem value="sucursal">En Bodega</MenuItem>
                  <MenuItem value="personalizada">Domicilio Remitente</MenuItem>
                </Select>
              </FormControl>
              {remission.senderType === "sucursal" ? (
                <Button
                  variant="contained"
                  fullWidth
                  css={css`
                    margin-top: 1rem;
                  `}
                  onClick={() => setmodalOpen("sender-bodega")}
                >
                  Seleccionar Sucursal
                </Button>
              ) : remission.senderType === "personalizada" ? (
                <Button
                  variant="contained"
                  fullWidth
                  css={css`
                    margin-top: 1rem;
                  `}
                  onClick={() => setmodalOpen("sender-personalizado")}
                >
                  Establecer Dirección
                </Button>
              ) : (
                ""
              )}
              <p>{remission.senderAddress?.formatted_address}</p>
            </TableCell>
            <TableCell>
              <h3>Destinatario</h3>
              <TextField
                value={remission.receiverContact}
                fullWidth
                onChange={(e) =>
                  handleUpdate("receiverContact", e.target.value)
                }
                label="Información de Contacto"
                helperText="Obligatorio"
              />
              <TextField
                value={remission.receiverName}
                fullWidth
                onChange={(e) => handleUpdate("receiverName", e.target.value)}
                label="Nombre de Destinatario"
              />
              <TextField
                value={remission.receiverRFC}
                fullWidth
                onChange={(e) => handleUpdate("receiverRFC", e.target.value)}
                label="RFC de Destinatario"
              />
              <TextField
                value={remission.receiverPhone}
                fullWidth
                onChange={(e) => handleUpdate("receiverPhone", e.target.value)}
                label="Teléfono de Destinatario"
                helperText="10 dígitos, sin espacios, sólo numeros"
              />
              <TextField
                value={remission.receiverEmail}
                fullWidth
                onChange={(e) => handleUpdate("receiverEmail", e.target.value)}
                label="Correo de destinatario"
              />
              <TextField
                multiline
                rows={4}
                value={remission.receiverComments}
                fullWidth
                onChange={(e) =>
                  handleUpdate("receiverComments", e.target.value)
                }
                label="Comentarios"
              />
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Tipo de Entrega
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={remission.receiverType}
                  label="Age"
                  onChange={(e) => handleUpdate("receiverType", e.target.value)}
                >
                  <MenuItem value="sucursal">En Bodega</MenuItem>
                  <MenuItem value="personalizada">
                    Domicilio Destinatario
                  </MenuItem>
                </Select>
              </FormControl>
              {remission.receiverType === "sucursal" ? (
                <Button
                  variant="contained"
                  fullWidth
                  css={css`
                    margin-top: 1rem;
                  `}
                  onClick={() => setmodalOpen("receiver-bodega")}
                >
                  Seleccionar Sucursal
                </Button>
              ) : remission.receiverType === "personalizada" ? (
                <Button
                  variant="contained"
                  fullWidth
                  css={css`
                    margin-top: 1rem;
                  `}
                  onClick={() => setmodalOpen("receiver-personalizado")}
                >
                  Establecer Dirección
                </Button>
              ) : (
                ""
              )}
              <p>{remission.receiverAddress?.formatted_address}</p>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <RemissionContent
        list={content}
        from={remission.from}
        to={remission.to}
        id={id}
      />

      <Modal open={!!modalOpen} handleClose={() => setmodalOpen(null)}>
        {modalOpen === "sender-bodega" ? (
          <WarehouseSetter
            warehouse={warehouse}
            handleSelect={(address) => handleUpdate("senderAddress", address)}
            handleClose={() => setmodalOpen(null)}
          />
        ) : modalOpen === "sender-personalizado" ? (
          <AddressSetter
            handleSelect={(address) => {
              handleUpdate("senderAddress", address);
              setmodalOpen(null);
            }}
            handleClose={() => setmodalOpen(null)}
          />
        ) : modalOpen === "receiver-bodega" ? (
          <WarehouseSetter
            warehouse={warehouse}
            handleSelect={(address) => handleUpdate("receiverAddress", address)}
            handleClose={() => setmodalOpen(null)}
          />
        ) : modalOpen === "receiver-personalizado" ? (
          <AddressSetter
            handleSelect={(address) => {
              handleUpdate("receiverAddress", address);
              setmodalOpen(null);
            }}
            handleClose={() => setmodalOpen(null)}
          />
        ) : (
          ""
        )}
      </Modal>
    </>
  );
}
