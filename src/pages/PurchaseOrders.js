import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../utils/firebase';
import { Grid, TextField, Button, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Paper, Box, Typography, Select, TableFooter } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { css } from '@emotion/core';
import numeral from 'numeral';
import moment from 'moment';
import _ from 'lodash';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const Item = ({ data, handlePayment }) => {

    const [vendor,setvendor] = useState({})
    const [incomes,setincomes] = useState('')

    useEffect(() => {
        if (data.vendor) {
            firebase.getDocument('vendors',data.vendor).get().then(snap => {
                setvendor(snap.data())
            })
        }
    },[data.vendor])

    useEffect(() => {
        if (data.id) {
            firebase.getCollection('finance-moves').where('type','==','cargo').where('orderId','==',data.id).onSnapshot(snap => {
                const incomes = snap.docs.map(doc => doc.data())
                const totalIncomes = _.reduce(incomes, (sum,n) => {
                    return sum + n.amount
                },0)
                setincomes(totalIncomes)
                handlePayment(totalIncomes)
            })
        }
    },[data.id])

    const prods = data.products ? data.products : [];

    const total = _.reduce(prods, (sum,n) => {
        return sum + ((n.product ? n.product.cost : 0)*n.quantity)
    },0)

    return (
        <TableRow>
            <TableCell>{moment(data.date).format('DD-MM-YYYY')}</TableCell>
            <TableCell>{data.folio}</TableCell>
            <TableCell>{vendor ? vendor.name : ''}</TableCell>
            <TableCell>{numeral(total).format('$0,0.00')}</TableCell>
            <TableCell>{numeral(incomes).format('$0,0.00')}</TableCell>
            <TableCell>{numeral(total-incomes).format('$0,0.00')}</TableCell>
            <TableCell>
                <Select
                    native
                    value={data.paymentStatus}
                    onChange={e => firebase.update('purchase-orders',data.id,'paymentStatus',e.target.value)}
                >
                    <option aria-label="None" value="" />
                    <option value="Anticipo">Anticipo</option>
                    <option value="Pagado">Pagado</option>
                    <option value="Cancelado">Cancelado</option>
                </Select>
            </TableCell>
            <TableCell>
                <Select
                    native
                    value={data.processStatus}
                    onChange={e => firebase.update('purchase-orders',data.id,'processStatus',e.target.value)}
                >
                    <option aria-label="None" value="" />
                    <option value="Fabricando">Fabricando</option>
                    <option value="Completado">Completado</option>
                    <option value="Entregado">Entregado</option>
                    <option value="Cancelado">Cancelado</option>
                </Select>
            </TableCell>
            <TableCell><IconButton color="primary" component={Link} to={`/compras/ordenes/${data.id}`}><ArrowForwardIosIcon/></IconButton></TableCell>
        </TableRow>
    )
}

export default function PurchaseOrders (props) {

    const [vendors,setvendors] = useState([])
    const [date,setdate] = useState('')
    const [vendor,setvendor] = useState({})
    const [quotations,setquotations] = useState([])
    const [month,setMonth] = useState(undefined)
    const [payment,setPayment] = useState(0)

    useEffect(() => {
        firebase.getCollection('vendors').get().then(snap => {
            const data = snap.docs.map(doc => doc.data())
            setvendors(data)
        })
        const current = moment().format('MM-YYYY')
        setMonth(current)
    },[])

    useEffect(() => {
        const initialMonth = moment(month,'MM-YYYY').startOf('month').valueOf()
        const endMonth = moment(month,'MM-YYYY').endOf('month').valueOf()
        if (initialMonth && endMonth) {
            setPayment(0)
            firebase.getCollection('purchase-orders').orderBy('date').where('date','<=',endMonth).where('date','>=',initialMonth).onSnapshot(snap => {
                const data = snap.docs.map(doc => doc.data())
                setquotations(_.orderBy(data,['folio'],['asc']))
            })
        }
    },[month])

    const total = _.reduce(quotations, (sum,n) => {
        const subtotal = _.reduce(n.products, (subsum,subn) => {
            return subsum + + ((subn.product ? subn.product.price : 0)*subn.quantity)
        },0)
        return sum + subtotal
    },0)

    return (
        <>
            <Grid css={css`
                margin: 1rem 0;
            `} component={Paper} alignItems="center" container spacing={3}>
                <Grid item xs={12} md={4}>
                    <TextField
                        label="Fecha"
                        variant="outlined"
                        value={date ? date : ''}
                        onChange={e => setdate(e.target.value)}
                        type="date"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <Autocomplete
                        id="combo-box-demo"
                        options={vendors}
                        getOptionLabel={user => user.name}
                        renderInput={params => <TextField {...params} fullWidth label="Proveedor" variant="outlined" />}
                        onChange={(e,value) => setvendor(value)}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <Button onClick={handleSubmit} fullWidth size="large" variant="contained" color="secondary">Continuar <ArrowForwardIcon css={css`
                        margin-left: .5rem;
                    `}/></Button>
                </Grid>
            </Grid>
            <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '2rem' }}>
                <IconButton onClick={() => setMonth(moment(month,'MM-YYYY').subtract(1,'month').format('MM-YYYY'))} color="primary" size="medium">
                    <ChevronLeftIcon fontSize="large" />
                </IconButton>
                <Typography align="center" style={{ margin: '0 2rem', }} color="primary" variant="h6">{month}</Typography>
                <IconButton onClick={() => setMonth(moment(month,'MM-YYYY').add(1,'month').format('MM-YYYY'))} color="primary" size="medium">
                    <ChevronRightIcon fontSize="large" />
                </IconButton>
            </Box>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Fecha</TableCell>
                        <TableCell>Folio</TableCell>
                        <TableCell>Cliente</TableCell>
                        <TableCell>Monto</TableCell>
                        <TableCell>Pagado</TableCell>
                        <TableCell>Saldo</TableCell>
                        <TableCell>Estatus Pago</TableCell>
                        <TableCell>Estatus Operación</TableCell>
                        <TableCell>Ver</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        quotations.map(item => <Item key={item.id} handlePayment={handlePayment} data={item} />)
                    }
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan="3"></TableCell>
                        <TableCell>{numeral(total).format('$0,0.00')}</TableCell>
                        <TableCell>{numeral(payment).format('$0,0.00')}</TableCell>
                        <TableCell>{numeral(total-payment).format('$0,0.00')}</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </>
    )

    async function handlePayment (amount) {
        try {
            if (amount) {
                setPayment(prevValue => prevValue+amount)
            }
        } catch (error) {
            alert(error.message)
        }
    }

    async function handleSubmit () {
        try {
            if (date && vendor) {
                const item = {
                    date: moment(date,'YYYY-MM-DD').valueOf(),
                    vendor: vendor.id
                }
                firebase.simpleAdd(item,'purchase-orders').then(id => {
                    props.history.push(`/compras/ordenes/${id}`)
                })
            }
        } catch (error) {
            alert(error.message)
        }
    }
}