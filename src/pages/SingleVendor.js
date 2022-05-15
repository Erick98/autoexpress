import React, { useEffect, useState } from 'react'
import firebase from '../utils/firebase'
import { Container, Divider, FormControl, InputLabel, Select, Table, TableBody, TableCell, TableRow, TextField } from '@material-ui/core'
import { css } from '@emotion/core'
import Loader from '../components/Loader'

export default function SingleVendor (props) {

    const { id } = props.match.params
    const [vendor,setvendor] = useState(null)

    useEffect(() => {
        firebase.getDocument('vendors',id).get().then(snap => {
            const data = snap.data()
            setvendor(data)
        })
    },[id])

    return vendor ? (
        <Container>
            <h3>Detalle de Cliente</h3>
            <Table css={css`
                width: 100%;
                max-width: 35rem;
            `}>
                <TableBody>
                    <TableRow>
                        <TableCell component="th" variant="head">Nombre de persona o razón social</TableCell>
                        <TableCell>{vendor.name}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component="th" variant="head">Email</TableCell>
                        <TableCell>{vendor.email}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component="th" variant="head">Teléfono</TableCell>
                        <TableCell>{vendor.phone}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component="th" variant="head">Página web</TableCell>
                        <TableCell>{vendor.page}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <Divider/>
            <h3>Cotizaciones</h3>
            <Divider/>
            <h3>Órdenes de Compra</h3>
            <Divider/>
            <h3>Estado de Cuenta</h3>
        </Container>
    ) : <Loader />
}