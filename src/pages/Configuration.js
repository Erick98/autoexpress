import React from 'react'
import { Grid, Paper } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { css } from '@emotion/core'

export default function Configuration () {

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
                <Link to="/configuracion/catalogos" css={css`
                    text-decoration: none;
                `}>
                    <Paper css={css`
                        padding: 2rem;
                    `}>
                        <h4 css={css`
                            font-size: 2rem;
                            text-align: center;
                        `}>Catálogos</h4>
                    </Paper>
                </Link>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
                <Link to="/configuracion/formulas" css={css`
                    text-decoration: none;
                `}>
                    <Paper css={css`
                        padding: 2rem;
                    `}>
                        <h4 css={css`
                            font-size: 2rem;
                            text-align: center;
                        `}>Fórmulas</h4>
                    </Paper>
                </Link>
            </Grid>
        </Grid>
    )
}