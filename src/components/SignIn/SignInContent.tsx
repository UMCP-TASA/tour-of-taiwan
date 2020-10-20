import React from "react"
import firebase from "gatsby-plugin-firebase"
import ClientOnly from "components/ClientOnly"

type Props = {
    signedOut?: React.ReactNode
    signedIn?: React.ReactNode
    children?: React.ReactNode | ((isSignedIn: boolean) => React.ReactNode)
}

const SignInContent = ({ signedOut, signedIn, children }: Props) => {
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

    if (typeof children === "function") {
        return <ClientOnly>{children(isSignedIn)}</ClientOnly>
    }

    return (
        <ClientOnly>
            {isSignedIn ? (
                <>
                    {signedIn}
                    {children}
                </>
            ) : (
                <>{signedOut}</>
            )}
        </ClientOnly>
    )
}

export default SignInContent
