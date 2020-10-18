import React from "react"
import firebase from "gatsby-plugin-firebase"
import { StyledFirebaseAuth } from "react-firebaseui"
import {
    Dialog,
    DialogProps,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button
} from "@material-ui/core"

// Config info can be found at https://firebaseopensource.com/projects/firebase/firebaseui-web/

type Props = DialogProps & {
    handleClose: () => void
}

const SignInPopup = ({ handleClose, ...rest }: Props) => {
    return (
        <Dialog {...rest} onClose={handleClose} aria-labelledby="sign-in-title">
            <DialogTitle id="sign-in-title">Sign-In</DialogTitle>
            <DialogContent>
                <StyledFirebaseAuth
                    firebaseAuth={firebase.auth()}
                    uiConfig={{
                        signInFlow: "popup",
                        signInOptions: [
                            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                            {
                                provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
                                requireDisplayName: true,
                            },
                        ],
                        callbacks: {
                            signInSuccessWithAuthResult: () => false,
                        },
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default SignInPopup
