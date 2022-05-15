import React, { Component, useEffect, useState } from 'react'
import firebase from '../../utils/firebase'
import ReactToPrint from 'react-to-print'
import { Button } from '@material-ui/core'
import { css } from '@emotion/core'
import moment from 'moment'
import numeral from 'numeral'
import _ from 'lodash'

import 'moment/locale/es'

import PrintIcon from '@material-ui/icons/Print';

const User = ({ id,index }) => {

    const [user,setuser] = useState({})

    useEffect(() => {
        if (id) {
            firebase.getDocument('users',id).get().then(snap => {
                setuser(snap.data())
            })
        }
    },[id])

    return <span>{user[index]}</span>
}

class Printable extends Component {
    render () {
        const data = this.props.data ? this.props.data : {}

        const products = data.products ? data.products : []

        const total = _.reduce(products, (sum,n) => {
            return sum + (n.product.price*n.quantity)
        },0)

        return (
            <div css={css`
                font-size: 1.2rem;
            `}>
                <div>
                    <img css={css`
                        width: 10rem;
                    `} src="/img/logo.jpg" alt="Autoexpress24horas"/>
                    <p style={{ marginTop: '1rem', textAlign: 'right' }}>
                        Ciudad de México, a {moment().locale('es').format('DD')} de {moment().locale('es').format('MMMM')} del {moment().locale('es').format('YYYY')}
                    </p>
                    <table css={css`
                        width: 100%;
                        border-collapse: collapse;
                        table-layout: fixed;
                        margin-top: 1rem;
                        td {
                            padding: 1rem;
                        }
                    `}>
                        <tbody>
                            <tr>
                                <td>Nombre de Cliente: </td>
                                <td><User id={data.customerId} index="name" /></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Email: </td>
                                <td><User id={data.customerId} index="email" /></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Teléfono: </td>
                                <td><User id={data.customerId} index="phone" /></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Lugar de Entrega</td>
                                <td>{data.deliveringPlace}</td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <table css={css`
                    th {
                        font-size: 1.2rem;
                        padding: 1rem;
                        text-align: center;
                    }
                    td {
                        font-size: 1.2rem;
                        padding: 1rem;
                    }
                `} style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed', marginTop: '2.5rem', }}>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Producto</th>
                            <th>Precio Unitario</th>
                            <th>Cantidad</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.products ? data.products.map((item,index) => <tr key={index}>
                            <td><img src={item.product.cover} alt={item.product.name} css={css`
                                width: 5rem;
                            `} /></td>
                            <td>{item.product.name}</td>
                            <td>{numeral(item.product.price).format('$0,0.00')}</td>
                            <td css={css`
                                text-align: center;
                            `}>{item.quantity}</td>
                            <td>{numeral(item.product.price*item.quantity).format('$0,0.00')}</td>
                        </tr>) : <tr></tr>}
                        <tr>
                            <td colSpan="3"></td>
                            <td>Total</td>
                            <td>{numeral(total).format('$0,0.00')}</td>
                        </tr>
                    </tbody>
                </table>
                <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed', marginTop: '4.5rem', fontSize: '1.2rem' }}>
                    <tbody>
                        <tr>
                            <td></td>
                            <td style={{ borderBottom: '1px solid #ccc' }}></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td style={{ textAlign: 'center' }}><br/>Atentamente:<br />Autoexpress24horas</td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

class PrintQuotation extends Component {
    render() {
        return (
            <div className="print-btn">
                <div style={{ display: 'none' }}><Printable data={this.props.data} ref={el => this.componentRef = el} /></div>
                <ReactToPrint
                    trigger={() => <Button color="secondary" fullWidth size="large" variant="contained">{this.props.message} <PrintIcon css={css`
                        margin-left: .5rem;
                    `}/></Button>}
                    content={() => this.componentRef}
                    pageStyle="margin:10mm 0;"
                />
            </div>
        )
    }
}

export default PrintQuotation