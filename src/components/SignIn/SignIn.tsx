import React from "react"
import firebase from "gatsby-plugin-firebase"
import { StyledFirebaseAuth } from "react-firebaseui"
import { Button, Typography } from "@material-ui/core"
import ClientOnly from "components/ClientOnly"

type Props = {}

const SignIn = ({}: Props) => {
    const [isSignedIn, setSignedIn] = React.useState(false)

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
                    <StyledFirebaseAuth
                        firebaseAuth={firebase.auth()}
                        uiConfig={{
                            signInFlow: "popup",
                            signInOptions: [
                                firebase.auth.EmailAuthProvider.PROVIDER_ID,
                                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                            ],
                            callbacks: {
                                signInSuccessWithAuthResult: () => false,
                            },
                        }}
                    />
                </>
            )}
        </ClientOnly>
    )
}

export default SignIn
