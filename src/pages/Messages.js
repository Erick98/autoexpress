import React, { useState, useEffect } from 'react'
import firebase from '../utils/firebase'
import { Grid, Typography, Checkbox, Card, CardHeader, CardContent } from '@material-ui/core'
import moment from 'moment'
import _ from 'lodash'
import { css } from '@emotion/core'

export default function Messages () {

    const [messages,setmessages] = useState([])

    useEffect(() => {
        firebase.getCollection('messages').orderBy('timestamp','desc').onSnapshot(snap => {
            const data = snap.docs.map(doc => doc.data())
            setmessages(data)
        })
    },[])

    const noRead = _.filter(messages, o => {
        return o.isRead !== true
    })

    const read = _.filter(messages, o => {
        return o.isRead === true
    })

    return (
        <>
            <Grid spacing={3} justify="flex-start" container>
                <Grid item xs={12} md={6}>
                    <Typography variant="h3" align="center" css={css`
                        margin-bottom: 2rem;
                    `}>Pendientes</Typography>
                    <ul>
                    {
                        noRead.map((item,index) => 
                            <Card key={index} css={css`
                                margin-bottom: 1rem;
                            `}>
                                <CardHeader
                                    action={
                                        <Checkbox checked={item.isRead} onChange={() => firebase.update('messages',item.id,'isRead',!item.isRead)} />
                                    }
                                    title={item.name}
                                    subheader={moment(item.timestamp).format('DD-MM-YYYY HH:mm a')}
                                />
                                <CardContent>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {item.email}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {item.phone}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {item.message}
                                    </Typography>
                                </CardContent>
                            </Card>
                        )
                    }
                    </ul>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="h3" align="center" css={css`
                        margin-bottom: 2rem;
                    `}>Atendidos</Typography>
                    <ul>
                    {
                        read.map((item,index) =>
                            <Card key={index} css={css`
                                margin-bottom: 1rem;
                            `}>
                                <CardHeader
                                    action={
                                        <Checkbox checked={item.isRead} onChange={() => firebase.update('messages',item.id,'isRead',!item.isRead)} />
                                    }
                                    title={item.name}
                                    subheader={moment(item.timestamp).format('DD-MM-YYYY HH:mm a')}
                                />
                                <CardContent>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {item.email}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {item.phone}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {item.message}
                                    </Typography>
                                </CardContent>
                            </Card>
                        )
                    }
                    </ul>
                </Grid>
            </Grid>
        </>
    )
}