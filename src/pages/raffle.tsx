import React from "react"
import { PageProps } from "gatsby"
import {
    Grid,
    Card,
    CardContent,
    Typography,
    makeStyles,
} from "@material-ui/core"

import SEO from "components/seo"
import { SignInContent } from "components/SignIn"
import LinkButton from "components/Buttons/LinkButton"
import { RaffleCard } from "components/Raffle"

const useStyles = makeStyles(theme => ({
    grid: {
        margin: theme.spacing(1),
    },
}))

const RafflePage = ({}: PageProps) => {
    const classes = useStyles()
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
                    <Card>
                        <CardContent>
                            <Typography>
                                Hey this is the card content
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* <SignInContent
                signedOut={
                    <Card raised>
                        <CardContent>
                        <Typography>Please sign in to see this page</Typography>
                        <LinkButton to="/signin">Sign In</LinkButton>
                        </CardContent>
                    </Card>
                }
                signedIn={
                    <>
                        <RaffleCard />
                    </>
                }
            /> */}
        </>
    )
}

export default RafflePage
