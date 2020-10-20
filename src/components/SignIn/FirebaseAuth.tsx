import React from "react"
import firebase from "gatsby-plugin-firebase"
import { StyledFirebaseAuth } from "react-firebaseui"

const FirebaseAuth = () => (
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
)

export default FirebaseAuth