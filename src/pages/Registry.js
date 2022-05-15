import React, { useState } from 'react';
import firebase from '../utils/firebase';
import { Container, Box, TextField, Typography, Button, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    formItem : {
        marginTop: theme.spacing(2)
    }
}))

export default function Registry (props) {

    const classes = useStyles()
    const [name,setname] = useState('')
    const [email,setemail] = useState('')
    const [password,setpassword] = useState('')

    return (
        <Box height="100vh" display="flex" alignItems="center">
            <Container style={{ padding: '2.5rem' }} component={Paper} maxWidth="xs">
                <Typography variant="h3" component="h1" color="primary" align="center">Registro</Typography>
                <TextField
                    label="Nombre"
                    value={name}
                    onChange={e => setname(e.target.value)}
                    fullWidth
                    variant="outlined"
                    className={classes.formItem}
                />
                <TextField
                    label="Email"
                    value={email}
                    onChange={e => setemail(e.target.value)}
                    fullWidth
                    variant="outlined"
                    className={classes.formItem}
                />
                <TextField
                    label="Password"
                    value={password}
                    onChange={e => setpassword(e.target.value)}
                    fullWidth
                    variant="outlined"
                    className={classes.formItem}
                    type="password"
                />
                <Button onClick={handleSubmit} color="primary" className={classes.formItem} fullWidth variant="contained">Entrar</Button>
            </Container>
        </Box>
    )

    async function handleSubmit () {
        try {
            if (name && email && password) {
                firebase.register(name,email,password).then(() => {
                    props.history.push('/')
                })
            } else {
                alert('Completa todos los campos para continuar')
            }
        } catch (error) {
            alert(error.message)
        }
    }
}