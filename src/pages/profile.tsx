import React from "react"
import { PageProps, navigate } from "gatsby"
import firebase from "gatsby-plugin-firebase"
import {
    Button,
    Container,
    Grid,
    Typography,
    makeStyles,
} from "@material-ui/core"

import SEO from "components/seo"
import ClientOnly from "components/ClientOnly"
import FAQ from "components/FAQ"
import { DeleteAccountButton } from "components/Buttons"

import useIsSignedIn from "hooks/useIsSignedIn"

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4),
    },
}))

const ProfilePage = ({}: PageProps) => {
    const classes = useStyles()
    const isSignedIn = useIsSignedIn()

    if (!isSignedIn) {
        // Not signed in so go sign in
        navigate("/signin")
        return <SEO title="Profile" />
    }


    return (
        <>
            <SEO title="Profile" />
            <Container maxWidth="md" className={classes.root}>
                <Grid
                    container
                    alignItems="center"
                    justify="center"
                    direction="column"
                    spacing={4}
                >
                    <Grid item>
                        <Typography variant="h3" align="center">
                            Account
                        </Typography>
                    </Grid>

                    <Grid item>
                        <ClientOnly>
                            <Typography align="center">
                                Welcome,{" "}
                                <b>
                                    {firebase.auth().currentUser?.displayName}
                                </b>
                            </Typography>
                        </ClientOnly>
                    </Grid>

                    <Grid item>
                        <Button
                            onClick={() => firebase.auth().signOut()}
                            variant="contained"
                            color="primary"
                        >
                            Sign out
                        </Button>
                    </Grid>

                    <Grid item>
                        <FAQ />
                    </Grid>

                    <Grid item>
                        <DeleteAccountButton />
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default ProfilePage
