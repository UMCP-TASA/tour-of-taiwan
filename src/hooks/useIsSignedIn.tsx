import React from "react"
import firebase from "gatsby-plugin-firebase"

export default function useIsSignedIn() {
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

    return isSignedIn
}