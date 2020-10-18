import React from "react"
import firebase from "gatsby-plugin-firebase"
import { Button, Typography, makeStyles } from "@material-ui/core"
import { Menu, PersonOutline } from "@material-ui/icons"

import ClientOnly from "components/ClientOnly"
import SignInPopup from "./SignInPopup"

const useStyles = makeStyles(theme => ({
    
}))

type Props = {}

const SignIn = ({}: Props) => {
    const [isSignedIn, setSignedIn] = React.useState(false)
    const [ dialogOpen, setDialogOpen] = React.useState(false)

    React.useEffect(() => {
        function handleStateChange(user: firebase.User | null) {
            setSignedIn(!!user)
        }
        firebase.auth().onAuthStateChanged(handleStateChange)

        return function cleanup() {
            firebase.auth().onAuthStateChanged(handleStateChange)
        }
    }, [setSignedIn])

    return (
        <ClientOnly>
            <Button variant="contained">
                <Menu />
                <PersonOutline />
            </Button>
            {isSignedIn ? (
                <>
                    <Typography>{`Welcome ${
                        firebase.auth().currentUser?.displayName
                    }`}</Typography>
                    <Button onClick={() => firebase.auth().signOut()}>
                        Sign out
                    </Button>
                </>
            ) : (
                <>
                    <Typography>Please sign in</Typography>
                    <Button onClick={() => setDialogOpen(true)}>
                        Sign In
                    </Button>
                    <SignInPopup open={dialogOpen} handleClose={() => setDialogOpen(false)} />
                </>
            )}
        </ClientOnly>
    )
}

export default SignIn
