import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles(theme => ({
    container : {
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
}))

export default function Loader () {

    const classes = useStyles()

    return (
        <div className={classes.container}>
            <CircularProgress />
        </div>
    )
}