import React, { useState, useEffect } from 'react';
import firebase from '../utils/firebase'
import { TextField, Button, FormControl, InputLabel, Select, Typography } from "@material-ui/core";
import { css } from '@emotion/core';
import moment from 'moment';


export default function AddFinanceMove () {

    const [date, setdate] = useState('')
    const [type, settype] = useState('')
    const [concept, setconcept] = useState('')
    const [amount, setamount] = useState('')

    useEffect(() => {
        const today = moment().format('YYYY-MM-DD')
        setdate(today)
    },[])

    return (
        <div css={css`
            padding: 1rem;
        `}>
            <Typography align="center" variant="h4">Agregar Movimiento</Typography>
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
            <FormControl fullWidth>
                <InputLabel htmlFor="type-label">Tipo</InputLabel>
                <Select
                    fullWidth
                    native
                    value={type ? type : ''}
                    onChange={e => settype(e.target.value)}
                    inputProps={{
                        name: 'type',
                        id: 'type-label',
                    }}
                >
                    <option aria-label="None" value="" />
                    <option value="cargo">Cargo / Egreso</option>
                    <option value="abono">Abono / Ingreso</option>
                    <option value="receivable">Cuenta Por Cobrar</option>
                    <option value="debt">Cuenta por Pagar</option>
                </Select>
            </FormControl>
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
            <Button onClick={handleSubmit} fullWidth color="secondary" variant="outlined">Agregar</Button>
        </div>
    )

    async function handleSubmit () {
        try {
            if (date && type && concept && amount) {
                if (type === 'receivable') {
                    const item = {
                        date: moment(date,'YYYY-MM-DD').valueOf(),
                        concept,
                        amount: Number(amount)
                    }
                    firebase.simpleAdd(item,`receivable`).then(() => {
                        alert('Movimiento agregado')
                        settype("")
                        setconcept("")
                        setamount("")
                    })
                } else if (type === 'debt') {
                    const item = {
                        date: moment(date,'YYYY-MM-DD').valueOf(),
                        concept,
                        amount: Number(amount)
                    }
                    firebase.simpleAdd(item,`debts`).then(() => {
                        alert('Movimiento agregado')
                        settype("")
                        setconcept("")
                        setamount("")
                    })
                } else {
                    const item = {
                        date: moment(date,'YYYY-MM-DD').valueOf(),
                        type,
                        concept,
                        amount: Number(amount)
                    }
                    firebase.simpleAdd(item,`finance-moves`).then(() => {
                        alert('Movimiento agregado')
                        settype("")
                        setconcept("")
                        setamount("")
                    })
                }
            } else {
                alert('Completa todos los campos para continuar')
            }
        } catch (error) {
            alert(error.message)
        }
    }
}