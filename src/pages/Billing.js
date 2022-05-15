import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import firebase from '../utils/firebase'
import { Button, Checkbox, IconButton, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core'
import { css } from '@emotion/core'
import moment from 'moment'

import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import Modal from '../components/Modal'
import AddBill from '../components/AddBill';
import Customer from '../components/Customer';

export default function Billing () {

    const [list,setlist] = useState([])
    const [open,setopen] = useState(false)

    useEffect(() => {
        firebase.getCollection('billing').onSnapshot(snap => {
            const data = snap.docs.map(doc => doc.data())
            setlist(data)
        })
    },[])

    const handleClose = () => {
        setopen(false)
    }

    return (
        <>
            <div css={css`
                display: flex;
                width: 100%;
            `}>
                <Button css={css`
                    margin-left: auto;
                `} variant="contained" color="primary" onClick={() => setopen(!open)}>Nueva Factura</Button>
            </div>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell variant="head" component="th" align="center">Pagado</TableCell>
                        <TableCell variant="head" component="th" align="center">Fecha</TableCell>
                        <TableCell variant="head" component="th" align="center">Cliente</TableCell>
                        <TableCell variant="head" component="th" align="center">Monto</TableCell>
                        <TableCell variant="head" component="th" align="center">Ver más</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        list.map(item => <TableRow key={item.id}>
                            <TableCell align="center"><Checkbox disabled checked={item.isPaid} /></TableCell>
                            <TableCell>{moment(item.date).format('DD-MM-YYYY')}</TableCell>
                            <TableCell><Customer id={item.customer} /></TableCell>
                            <TableCell>{item.amount}</TableCell>
                            <TableCell align="center"><IconButton component={Link} to={`/ventas/facturacion/${item.id}`} color="primary"><ArrowForwardIosIcon/></IconButton></TableCell>
                        </TableRow>)
                    }
                </TableBody>
            </Table>
            <Modal open={open} handleClose={handleClose}>
                <AddBill/>
            </Modal>
        </>
    )
}