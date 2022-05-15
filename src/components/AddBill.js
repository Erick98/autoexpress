import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import firebase from '../utils/firebase'
import { Button, FormControl, InputLabel, Select, TextField } from '@material-ui/core'
import moment from 'moment'
import { css } from '@emotion/core'

export default function AddBill () {

    const history = useHistory();
    const [state,setstate] = useState({})
    const [customers,setcustomers] = useState([])

    const handleChange = (index,value) => {
        var newState = {...state}
        newState[index] = value
        setstate(newState)
    }

    useEffect(() => {
        firebase.getCollection('customers').get().then(snap => {
            const data = snap.docs.map(doc => doc.data())
            setcustomers(data)
        })
    },[])

    return (
        <>
            <h3>Nueva Factura</h3>
            <FormControl css={css`
                margin-top: 0rem;
            `} fullWidth variant="outlined">
                <InputLabel htmlFor="customer">Cliente</InputLabel>
                <Select
                    native
                    value={state.customer}
                    onChange={e => handleChange('customer',e.target.value)}
                    label="Cliente"
                    inputProps={{
                        name: 'customer',
                        id: 'customer',
                    }}
                >
                    <option aria-label="None" value="" />
                    {
                        customers.map(item => <option key={item.id} value={item.id}>{item.name} - {item.email} - {item.phone}</option>)
                    }
                </Select>
            </FormControl>
            <TextField
                label="Fecha"
                value={moment(state.date).format('YYYY-MM-DD')}
                fullWidth
                variant="outlined"
                onChange={e => handleChange('date',moment(e.target.value,'YYYY-MM-DD').valueOf())}
                css={css`
                    margin-top: 1rem;
                `}
                type="date"
            />
            <TextField
                label="Monto"
                value={state.amount}
                fullWidth
                variant="outlined"
                onChange={e => handleChange('amount',e.target.value)}
                css={css`
                    margin-top: 1rem;
                `}
                type="number"
            />
            <Button onClick={handleSubmit} css={css`
                margin-top: 1rem;
            `} variant="contained" fullWidth color="primary">Agregar</Button>
        </>
    )

    async function handleSubmit () {
        try {
            if (state.date && state.customer && state.amount) {
                firebase.simpleAdd(state,'billing').then(id => {
                    history.push(`/ventas/facturacion/${id}`)
                });
            } else {
                alert('Completa todos los campos para continuar')
            }
        } catch (error) {
            alert(error.message)
        }
    }
}