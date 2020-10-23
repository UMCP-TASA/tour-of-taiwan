import React from "react"
import { PageProps, navigate } from "gatsby"
import firebase from "gatsby-plugin-firebase"
import {
    Button,
    Container,
    Grid,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Typography,
    makeStyles,
    Snackbar,
} from "@material-ui/core"
import { Alert } from "@material-ui/lab"

import SEO from "components/seo"
import ClientOnly from "components/ClientOnly"
import useIsSignedIn from "hooks/useIsSignedIn"
import FAQ from "components/FAQ"
import { SignInPopup } from "components/SignIn"
import { NotificationContext } from "components/Notification"

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4),
    },
}))

const ProfilePage = ({}: PageProps) => {
    const classes = useStyles()
    const isSignedIn = useIsSignedIn()

    // Have to have these before the if statement because all hooks
    // need to be defined outside of any control flow
    const [open, setOpen] = React.useState(false)
    const handleClose = () => setOpen(false)

    const [signInOpen, setSignInOpen] = React.useState(false)
    const [snackbarOpen, setSnackbarOpen] = React.useState(false)
    const [snackbarContent, setSnackbarContent] = React.useState(<></>)

    const { setNotification } = React.useContext(NotificationContext)

    if (!isSignedIn) {
        // Not signed in so go sign in
        navigate("/signin")
        return <SEO title="Profile" />
    }

    const signInSuccessWithAuthResult = () => {
        firebase
            .auth()
            .currentUser?.delete()
            .then(() => {
                setSignInOpen(false)
                setNotification({
                    severity: "success",
                    message: "Successfully deleted account!",
                })
            })
            .catch(error => {
                setSignInOpen(false)
                setNotification({
                    severity: "error",
                    message: `Something went wrong! ${error}`,
                })
            })

        // No redirect
        return false
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
                        <Button onClick={() => setOpen(true)}>
                            Delete Account
                        </Button>

                        <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="confirm-delete-title"
                            aria-describedby="confirm-delete-text"
                        >
                            <DialogTitle id="confirm-delete-title">
                                Are you sure you want to delete?
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText id="confirm-delete-text">
                                    Deleting your account will also delete all
                                    of your raffle tickets. Deleting your
                                    account is irreversible!
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button
                                    onClick={() => {
                                        setOpen(false)
                                        setSignInOpen(true)
                                    }}
                                >
                                    Delete
                                </Button>
                                <Button onClick={handleClose} autoFocus>
                                    Cancel
                                </Button>
                            </DialogActions>
                        </Dialog>

                        <SignInPopup
                            open={signInOpen}
                            handleClose={() => setSignInOpen(false)}
                            title="Please sign in again to confirm deletion"
                            signInSuccessWithAuthResult={
                                signInSuccessWithAuthResult
                            }
                        />
                    </Grid>
                </Grid>
            </Container>

            <Snackbar
                open={snackbarOpen}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                autoHideDuration={12000}
                onClose={() => setSnackbarOpen(false)}
            >
                {snackbarContent}
            </Snackbar>
        </>
    )
}

export default ProfilePage
