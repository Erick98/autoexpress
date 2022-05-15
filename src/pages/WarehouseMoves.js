import React, { useEffect, useState } from 'react'
import firebase from '../utils/firebase'
import { Table, TableCell, TableHead, TableRow } from '@material-ui/core'

export default function WarehouseMoves () {

    const [list,setlist] = useState([])

    useEffect(() => {
        firebase.getCollection('warehouse').onSnapshot(snap => {
            const data = snap.docs.map(doc => doc.data())
            setlist(data)
        })
    },[])

    return (
        <>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Fecha</TableCell>
                        <TableCell>SKU</TableCell>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Tipo</TableCell>
                        <TableCell>Acciones</TableCell>
                    </TableRow>
                </TableHead>
            </Table>
        </>
    )
}