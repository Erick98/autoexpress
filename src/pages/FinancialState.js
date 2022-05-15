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

    const filtered = props.moves.slice(0,Number(props.index) + 1);
    const {data, prevBalance} = props

    const balance = _.reduce(filtered, (sum,n) => {
        if (n.type === 'abono') {
            return sum + n.amount
        } else {
            return sum - n.amount
        }
    },prevBalance)

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
            <TableCell>{data.type === 'abono' ? numeral(data.amount).format('$0,0.00') : ''}</TableCell>
            <TableCell>{data.type === 'cargo' ? numeral(data.amount).format('$0,0.00') : ''}</TableCell>
            <TableCell>{numeral(balance).format('$0,0.00')}</TableCell>
        </TableRow>
    )
}

export default function FinancialState () {

    const [data,setData] = useState([]);
    const [month,setMonth] = useState(undefined)
    const [months,setMonths] = useState([])

    useEffect(() => {
        const current = moment().format('MM-YYYY')
        setMonth(current)
    },[])

    useEffect(() => {
        firebase.getCollection('months').orderBy('label').onSnapshot(snap => {
            const data = snap.docs.map(doc => doc.data())
            setMonths(data)
        })
    },[])

    useEffect(() => {
        const initialMonth = moment(month,'MM-YYYY').startOf('month').valueOf()
        const endMonth = moment(month,'MM-YYYY').endOf('month').valueOf()
        if ( initialMonth && endMonth) {
            firebase.getCollection('finance-moves').orderBy('date').where('date','<=',endMonth).where('date','>=',initialMonth).onSnapshot(snap => {
                const data = snap.docs.map(doc => doc.data())
                setData(data)
            })
        }
    },[month])

    const prevMonth = moment(month, 'MM-YYYY').valueOf()
    const prevObjs = _.filter(months, o => {
        return moment(o.label,'MM-YYYY').valueOf() < prevMonth
    })
    const prevTotal = _.reduce(prevObjs, (sum,o) => {
        return o.amount + sum
    },0)
    
    const totalIncomes = _.reduce(data, (sum,n) => {
        if (n.type === 'abono') {
            return sum + n.amount
        } else {
            return sum
        }
    },0)

    const totalExpenses = _.reduce(data, (sum,n) => {
        if (n.type === 'cargo') {
            return sum + n.amount
        } else {
            return sum
        }
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
                        <TableCell>Abonos</TableCell>
                        <TableCell>Cargos</TableCell>
                        <TableCell>Balance</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>{Object.keys(data).map(key => <Item key={key} moves={data} prevBalance={prevTotal} index={key} data={data[key]} />)}</TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan="4"></TableCell>
                        <TableCell>{numeral(totalIncomes).format('$0,0.00')}</TableCell>
                        <TableCell>{numeral(totalExpenses).format('$0,0.00')}</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </Container>
    )
}