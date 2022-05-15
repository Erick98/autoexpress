import React, { useEffect, useState } from 'react';
import firebase from '../utils/firebase';
import { Typography, List, ListItem, ListItemText, Grid, TextField, Divider, Button, Table, TableHead, TableRow, TableCell, TableBody, TableFooter, Box, Paper, IconButton } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { css } from '@emotion/core';
import numeral from 'numeral';
import moment from 'moment';
import _ from 'lodash';

import DeleteIcon from '@material-ui/icons/Delete';
import PrintPurchaseOrder from '../components/prints/PrintPurchaseOrder';

const Item = (props) => {

    const filtered = props.moves.slice(0,Number(props.index) + 1);
    const {data, total} = props

    const balance = _.reduce(filtered, (sum,n) => {
        return sum - n.amount
    },total)

    return (
        <TableRow>
            <TableCell align="center">
                <IconButton onClick={() => firebase.delete('finance-moves',data.id,data)} size="small" color="secondary">
                    <DeleteIcon fontSize="small" />
                </IconButton>
            </TableCell>
            <TableCell>{moment(data.date).format('DD-MM-YYYY')}</TableCell>
            <TableCell>{data.concept}</TableCell>
            <TableCell>{data.type === 'cargo' ? numeral(data.amount).format('$0,0.00') : ''}</TableCell>
            <TableCell>{numeral(balance).format('$0,0.00')}</TableCell>
        </TableRow>
    )
}

export default function SinglePurchaseOrder (props) {

    const id = props.match.params.id

    const [incomes,setincomes] = useState([])
    const [products,setproducts] = useState([])
    const [order,setorder] = useState({})
    const [user,setuser] = useState({})
    const [selected,setselected] = useState({})
    const [quantity,setquantity] = useState('')

    const [date, setdate] = useState('')
    const [concept, setconcept] = useState('')
    const [amount, setamount] = useState('')

    useEffect(() => {
        const today = moment().format('YYYY-MM-DD')
        setdate(today)
    },[])

    useEffect(() => {
        firebase.getDocument('purchase-orders',id).onSnapshot(snap => {
            setorder(snap.data())
        })
        firebase.getCollection('products').onSnapshot(snap => {
            const data = snap.docs.map(doc => doc.data())
            setproducts(data)
        })
        firebase.getCollection('finance-moves').where('type','==','cargo').where('orderId','==',id).onSnapshot(snap => {
            const data = snap.docs.map(doc => doc.data())
            setincomes(data)
        })
    },[id])

    useEffect(() => {
        if (order.vendor) {
            firebase.getDocument('vendors',order.vendor).get().then(snap => {
                setuser(snap.data())
            })
        }
    },[order.vendor])

    const prods = order.products ? order.products : [];

    const total = _.reduce(prods, (sum,n) => {
        return sum + ((n.product ? n.product.cost : 0)*n.quantity)
    },0)

    const totalIncomes = _.reduce(incomes, (sum,n) => {
        return sum + n.amount
    },0)

    return (
        <>
            <Typography css={css`
                margin-top: 1rem;
            `} variant="h4" component="h1">Detalle de Orden de Compra</Typography>
            <Divider
                css={css`
                    margin-top: 1rem;
                `}
            />
            <List>
                <ListItem>
                    <ListItemText
                        primary="Fecha"
                        secondary={(
                            <TextField
                                css={css`
                                    max-width: 30rem;
                                `}
                                value={moment(order.date).format('YYYY-MM-DD')}
                                fullWidth
                                variant="outlined"
                                onChange={e => firebase.update('purchase-orders',id,'date', moment(e.target.value,'YYYY-MM-DD').valueOf())}
                                type="date"
                            />
                        )}
                    />
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary="Nombre de Proveedor"
                        secondary={user.name}
                    />
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary="Email de Proveedor"
                        secondary={user.email}
                    />
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary="Teléfono de Proveedor"
                        secondary={user.phone}
                    />
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary="Por Cobrar"
                        secondary={numeral(total-totalIncomes).format('$0,0.00')}
                    />
                </ListItem>
            </List>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <TextField
                        label="Folio"
                        value={order.folio ? order.folio : ''}
                        onChange={e => firebase.update('purchase-orders',id,'folio', e.target.value)}
                        fullWidth
                        variant="outlined"
                        type="number"
                    />
                </Grid>
            </Grid>
            <Typography css={css`
                margin-top: 2rem;
            `} variant="h4">Agregar productos a cotización</Typography>
            <Grid alignItems="center" css={css`
                margin-top: 1rem;
            `} container spacing={3}>
                <Grid item xs={12} md={4}>
                    <Autocomplete
                        options={products}
                        getOptionLabel={(option) => `${option.name} - ${numeral(option.cost).format('$0,0.00')}`}
                        onChange={(e,val) => setselected(val)}
                        renderInput={(params) => <TextField {...params} fullWidth label="Producto" variant="outlined" />}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <TextField
                        label="Cantidad"
                        variant="outlined"
                        fullWidth
                        value={quantity}
                        onChange={e => setquantity(Number(e.target.value))}
                        type="number"
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <Button onClick={handleAdd} size="large" variant="contained" fullWidth color="primary">Agregar Producto</Button>
                </Grid>
            </Grid>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Eliminar</TableCell>
                        <TableCell>Producto</TableCell>
                        <TableCell>Precio Unitario</TableCell>
                        <TableCell>Cantidad</TableCell>
                        <TableCell>Total</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {prods.map((item,index) => <TableRow key={index}>
                        <TableCell><IconButton onClick={() => handleRemoveProduct(index)}><DeleteIcon /></IconButton></TableCell>
                        <TableCell>{item.product.name}</TableCell>
                        <TableCell>{numeral(item.product.cost).format('$0,0.00')}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>{numeral(item.product.cost*item.quantity).format('$0,0.00')}</TableCell>
                    </TableRow>)}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan="2"></TableCell>
                        <TableCell align="right">Total</TableCell>
                        <TableCell>{numeral(total).format('$0,0.00')}</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
            <Box display="flex" justifyContent="flex-end" marginTop="2rem" marginBottom="2.5rem">
                <PrintPurchaseOrder data={order} message="Imprimir" />
            </Box>
            <Grid container spacing={3}>
                <Grid component={Paper} item xs={12} md={4}>
                    <Typography variant="h5" align="center">Agregar Pago</Typography>
                    <TextField
                        label="Fecha"
                        fullWidth
                        value={date ? date : ''}
                        onChange={e => setdate(e.target.value)}
                        type="date"
                        css={css`
                            margin-top: 1rem;
                        `}
                    />
                    <TextField
                        label="Concepto"
                        fullWidth
                        value={concept ? concept : ''}
                        onChange={e => setconcept(e.target.value)}
                    />
                    <TextField
                        label="Monto"
                        fullWidth
                        value={amount ? amount : ''}
                        onChange={e => setamount(e.target.value)}
                        css={css`
                            margin-bottom: 1rem;
                        `}
                        type="number"
                    />
                    <Button onClick={handleIncome} fullWidth color="secondary" variant="outlined">Agregar</Button>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Eliminar</TableCell>
                                <TableCell>Fecha</TableCell>
                                <TableCell>Concepto</TableCell>
                                <TableCell>Monto</TableCell>
                                <TableCell>Saldo</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>{Object.keys(incomes).map(key => <Item key={key} moves={incomes} total={total} index={key} data={incomes[key]} />)}</TableBody>
                    </Table>
                </Grid>
            </Grid>
        </>
    )

    async function handleRemoveProduct (index) {
        try {
            var newList = [...prods]
            delete newList[index]
            const filtered = _.filter(newList, o => {
                return o
            })
            firebase.update('purchase-orders',id,'products', filtered)
        } catch (error) {
            alert(error.message)
        }
    }

    async function handleIncome () {
        try {
            if (date && concept && amount) {
                const item = {
                    date: moment(date,'YYYY-MM-DD').valueOf(),
                    type: 'cargo',
                    concept,
                    amount: Number(amount),
                    orderId: id
                }
                firebase.simpleAdd(item,`finance-moves`).then(() => {
                    alert('Movimiento agregado')
                    setconcept("")
                    setamount("")
                })
            }
        } catch (error) {
            alert(error.message)
        }
    }

    async function handleAdd () {
        try {
            if (selected && quantity) {
                const item = {
                    product: selected,
                    quantity
                }
                const newList = [...prods]
                newList.push(item)
                firebase.update('purchase-orders',id,'products',newList).then(() => {
                    alert('Producto agregado')
                    setquantity(null)
                })
            }
        } catch (error) {
            alert(error.message)
        }
    }
}