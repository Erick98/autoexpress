import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { Container, ButtonGroup, Button, Box } from '@material-ui/core';
import Vendors from './Vendors';
import SingleVendor from './SingleVendor';
import PurchaseOrders from './PurchaseOrders';
import SinglePurchaseOrder from './SinglePurchaseOrder';

export default function Purchases (props) {

    const loc = props.location.pathname.split('/')[2];
    // const { rol } = props

    return (
        <Container>
            <ButtonGroup size="large" color="primary" aria-label="large outlined primary button group">
                <Button style={{ cursor: 'default' }} variant="contained">Compras</Button>
                <Button disabled={loc === undefined ? true : ''} component={Link} to="/compras">Proveedores</Button>
                <Button disabled={loc === 'ordenes' ? true : ''} component={Link} to="/compras/ordenes">Órdenes de Compra</Button>
            </ButtonGroup>
            <Box paddingY="1rem">
                <Switch>
                    <Route path="/compras" component={Vendors} exact={true} />
                    <Route path="/compras/ordenes" component={PurchaseOrders} exact={true} />
                    <Route path="/compras/ordenes/:id" component={SinglePurchaseOrder} exact={true} />
                    <Route path="/compras/proveedores/:id" component={SingleVendor} exact={true} />
                </Switch>
            </Box>
        </Container>
    )
}