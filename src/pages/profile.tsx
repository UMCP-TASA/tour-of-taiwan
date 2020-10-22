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
import useIsSignedIn from "hooks/useIsSignedIn"
import { FirebaseAuth } from "components/SignIn"

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(1),
    },
}))

const ProfilePage = ({}: PageProps) => {
    const classes = useStyles()
    const isSignedIn = useIsSignedIn()

    if (!isSignedIn) {
        // Not signed in so go sign in
        navigate("/signin")
        return <></>
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
                >
                    <ClientOnly>
                        {isSignedIn ? (
                            <>
                                <Typography align="center">{`Welcome ${
                                    firebase.auth().currentUser?.displayName
                                }`}</Typography>
                                <Button
                                    onClick={() => firebase.auth().signOut()}
                                >
                                    Sign out
                                </Button>
                            </>
                        ) : (
                            <>
                                <FirebaseAuth />
                            </>
                        )}
                    </ClientOnly>
                </Grid>
            </Container>
        </>
    )
}

export default ProfilePage
