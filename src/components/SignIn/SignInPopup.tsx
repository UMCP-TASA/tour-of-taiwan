import React from "react"
import {
    Dialog,
    DialogProps,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button
} from "@material-ui/core"
import FirebaseAuth from "./FirebaseAuth"

// Config info can be found at https://firebaseopensource.com/projects/firebase/firebaseui-web/

type Props = DialogProps & {
    handleClose: () => void
}

const SignInPopup = ({ handleClose, ...rest }: Props) => {
    return (
        <Dialog {...rest} onClose={handleClose} aria-labelledby="sign-in-title">
            <DialogTitle id="sign-in-title">Sign-In</DialogTitle>
            <DialogContent>
                <FirebaseAuth />
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
