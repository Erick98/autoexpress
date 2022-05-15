import React, { useState, useEffect } from 'react';
import firebase from '../utils/firebase'
import { Container, Table, TableHead, TableRow, TableCell, TableBody, IconButton } from '@material-ui/core';
import numeral from 'numeral'
import moment from 'moment'
import _ from 'lodash'

import DeleteIcon from '@material-ui/icons/Delete';

const Item = (props) => {

    const filtered = props.moves.slice(0,Number(props.index) + 1);
    const {data} = props

    const balance = _.reduce(filtered, (sum,n) => {
        return sum + n.amount
    },0)

    return (
        <TableRow>
            <TableCell align="center">
                <IconButton onClick={() => firebase.delete('receivable',data.id,data)} size="small" color="secondary">
                    <DeleteIcon fontSize="small" />
                </IconButton>
            </TableCell>
            <TableCell>{moment(data.date).format('DD-MM-YYYY')}</TableCell>
            <TableCell>{data.concept}</TableCell>
            <TableCell>{numeral(data.amount).format('$0,0.00')}</TableCell>
            <TableCell>{numeral(balance).format('$0,0.00')}</TableCell>
        </TableRow>
    )
}

export default function Receivable () {

    const [receivable,setreceivable] = useState([])

    useEffect(() => {
        firebase.getCollection('receivable').orderBy('date').onSnapshot(snap => {
            const data = snap.docs.map(doc => doc.data())
            setreceivable(data)
        })
    },[])

    return (
        <Container>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Acciones</TableCell>
                        <TableCell>Fecha</TableCell>
                        <TableCell>Concepto</TableCell>
                        <TableCell>Monto</TableCell>
                        <TableCell>Balance</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>{Object.keys(receivable).map(key => <Item key={key} moves={receivable} index={key} data={receivable[key]} />)}</TableBody>
            </Table>
        </Container>
    )
}