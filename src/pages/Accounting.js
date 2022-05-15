import React, { useState } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { Container, Button, Box, AppBar, Toolbar, IconButton, Typography, MenuItem, Menu } from '@material-ui/core';
import { css } from '@emotion/core';

import MenuIcon from '@material-ui/icons/Menu'
import AddIcon from '@material-ui/icons/Add';

import Modal from '../components/Modal'
import AddFinanceMove from '../components/AddFinancialMove';
import FinancialState from './FinancialState';
import Incomes from './Incomes';
import Expenses from './Expenses';
import Receivable from './Receivable';
import Debts from './Debts';

const ITEM_HEIGHT = 48;

export default function Accounting (props) {

    const loc = props.location.pathname.split('/')[2];
    const [anchorEl, setAnchorEl] = useState(null);
    const [modalOpen,setmodalOpen] = useState(false);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Container>
            <AppBar position="relative">
                <Toolbar variant="dense">
                    <IconButton aria-label="more" aria-controls="long-menu" aria-haspopup="true" edge="start" color="inherit" aria-label="menu" onClick={handleClick}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit">
                        Contabilidad
                    </Typography>
                    <Button onClick={() => setmodalOpen(true)} css={css`
                        margin-left: auto;
                    `} color="secondary" variant="contained" size="small"><AddIcon css={css`margin-right:.5rem;`}/> Agregar Movimiento</Button>
                </Toolbar>
            </AppBar>
            <Menu
                id="long-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                    },
                }}
            >
                <MenuItem css={css`
                    text-align: center;
                `} disabled={loc === undefined ? true : ''} component={Link} to="/contabilidad">Estado Financiero</MenuItem>
                <MenuItem css={css`
                    text-align: center;
                `} disabled={loc === 'ingresos' ? true : ''} component={Link} to="/contabilidad/ingresos">Ingresos</MenuItem>
                <MenuItem css={css`
                    text-align: center;
                `} disabled={loc === 'egresos' ? true : ''} component={Link} to="/contabilidad/egresos">Egresos</MenuItem>
                <MenuItem css={css`
                    text-align: center;
                `} disabled={loc === 'cuentas-cobrar' ? true : ''} component={Link} to="/contabilidad/cuentas-cobrar">Cuentas por cobrar</MenuItem>
                <MenuItem css={css`
                    text-align: center;
                `} disabled={loc === 'cuentas-pagar' ? true : ''} component={Link} to="/contabilidad/cuentas-pagar">Cuentas por pagar</MenuItem>
            </Menu>
            <Box paddingY="1rem">
                <Switch>
                    <Route path="/contabilidad" component={FinancialState} exact={true} />
                    <Route path="/contabilidad/ingresos" component={Incomes} exact={true} />
                    <Route path="/contabilidad/egresos" component={Expenses} exact={true} />
                    <Route path="/contabilidad/cuentas-cobrar" component={Receivable} exact={true} />
                    <Route path="/contabilidad/cuentas-pagar" component={Debts} exact={true} />
                </Switch>
            </Box>
            <Modal open={modalOpen} handleClose={() => setmodalOpen(null)}>
                <AddFinanceMove />
            </Modal>
        </Container>
    )
}