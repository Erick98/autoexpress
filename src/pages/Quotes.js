import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import firebase from '../utils/firebase'
import { Button, Checkbox, IconButton, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core'
import { css } from '@emotion/core'
import moment from 'moment'

import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

export default function Quotes () {

    const [list,setlist] = useState([])
    const [open,setopen] = useState(false)

    useEffect(() => {
        firebase.getCollection('quotes').onSnapshot(snap => {
            const data = snap.docs.map(doc => doc.data())
            setlist(data)
        })
    },[])

    const handleClose = () => {
        setopen(false)
    }

    return (
        <>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell variant="head" component="th" align="center">Fecha</TableCell>
                        <TableCell variant="head" component="th" align="center">Nombre</TableCell>
                        <TableCell variant="head" component="th" align="center">Email</TableCell>
                        <TableCell variant="head" component="th" align="center">Ver más</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        list.map(item => <TableRow key={item.id}>
                            <TableCell>{moment(item.timestamp).format('DD-MM-YYYY')}</TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.email}</TableCell>
                            <TableCell align="center"><IconButton component={Link} to={`/ventas/cotizaciones/${item.id}`} color="primary"><ArrowForwardIosIcon/></IconButton></TableCell>
                        </TableRow>)
                    }
                </TableBody>
            </Table>
        </>
    )
}