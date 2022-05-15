import React, { useState, useEffect } from 'react';
import firebase from '../utils/firebase';
import { Container, Box, IconButton, Typography, Table, TableHead, TableRow, TableCell, TableBody, TableFooter } from '@material-ui/core';
import moment from 'moment'
import numeral from 'numeral'
import _ from 'lodash'

import DeleteIcon from '@material-ui/icons/Delete';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const Item = (props) => {

    const {data} = props

    return (
        <TableRow>
            <TableCell align="center">
                <IconButton onClick={() => firebase.delete('finance-moves',data.id,data)} size="small" color="secondary">
                    <DeleteIcon fontSize="small" />
                </IconButton>
            </TableCell>
            <TableCell>{moment(data.date).format('DD-MM-YYYY')}</TableCell>
            <TableCell>{data.type}</TableCell>
            <TableCell>{data.concept}</TableCell>
            <TableCell>{numeral(data.amount).format('$0,0.00')}</TableCell>
        </TableRow>
    )
}

export default function Expenses () {

    const [data,setData] = useState([]);
    const [month,setMonth] = useState(undefined)

    useEffect(() => {
        const current = moment().format('MM-YYYY')
        setMonth(current)
    },[])

    useEffect(() => {
        const initialMonth = moment(month,'MM-YYYY').startOf('month').valueOf()
        const endMonth = moment(month,'MM-YYYY').endOf('month').valueOf()
        if ( initialMonth && endMonth) {
            firebase.getCollection('finance-moves').orderBy('date').where('type','==','cargo').where('date','<=',endMonth).where('date','>=',initialMonth).onSnapshot(snap => {
                const data = snap.docs.map(doc => doc.data())
                setData(data)
            })
        }
    },[month])

    const total = _.reduce(data, (sum,n) => {
        return sum + n.amount
    },0)

    return (
        <Container>
            <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '2rem' }}>
                <IconButton onClick={() => setMonth(moment(month,'MM-YYYY').subtract(1,'month').format('MM-YYYY'))} color="primary" size="medium">
                    <ChevronLeftIcon fontSize="large" />
                </IconButton>
                <Typography align="center" style={{ margin: '0 2rem', }} color="primary" variant="h6">{month}</Typography>
                <IconButton onClick={() => setMonth(moment(month,'MM-YYYY').add(1,'month').format('MM-YYYY'))} color="primary" size="medium">
                    <ChevronRightIcon fontSize="large" />
                </IconButton>
            </Box>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Acciones</TableCell>
                        <TableCell>Fecha</TableCell>
                        <TableCell>Tipo</TableCell>
                        <TableCell>Concepto</TableCell>
                        <TableCell>Monto</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>{Object.keys(data).map(key => <Item key={key} index={key} data={data[key]} />)}</TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan="3"></TableCell>
                        <TableCell align="center">Total</TableCell>
                        <TableCell align="center">{numeral(total).format('$0,0.00')}</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </Container>
    )
}