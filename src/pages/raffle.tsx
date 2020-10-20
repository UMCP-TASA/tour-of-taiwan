import React from "react"
import { PageProps } from "gatsby"
import {
    Grid,
    Typography,
    makeStyles,
} from "@material-ui/core"

import SEO from "components/seo"
import ClientOnly from "components/ClientOnly"
import { RaffleCard } from "components/Raffle"
import useIsSignedIn from "hooks/useIsSignedIn"

const useStyles = makeStyles(theme => ({
    grid: {
        margin: theme.spacing(1),
    },
}))

const RafflePage = ({}: PageProps) => {
    const classes = useStyles()
    const isSignedIn = useIsSignedIn()

    return (
        <>
            <SEO title="Raffle" />
            <Grid
                container
                alignItems="center"
                justify="center"
                className={classes.grid}
            >
                <Grid item xs={12} md={6}>
                    <RaffleCard isSignedIn={isSignedIn} />
                </Grid>
            </Grid>
        </>
    )
}

export default RafflePage
