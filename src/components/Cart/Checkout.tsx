import React from "react"
import firebase from "gatsby-plugin-firebase"
import { navigate } from "@reach/router"
import { useShoppingCart } from "use-shopping-cart"
import { Button, CircularProgress, Typography } from "@material-ui/core"

import { getStripe } from "utils/stripe"
import useIsSignedIn from "hooks/useIsSignedIn"

type Item = {
    price: string
    quantity: number
}

type Props = {
    handleClose: () => void
}

const Checkout = ({ handleClose }: Props) => {
    const { cartDetails } = useShoppingCart()
    const isSignedIn = useIsSignedIn()
    const [disabled, setDisabled] = React.useState(false)
    const [buttonText, setButtonText] = React.useState<React.ReactNode>(
        "Checkout"
    )
    const [errorMessage, setErrorMessage] = React.useState("")

    const handleNotSignedIn = () => {
        handleClose()
        if (window.location.pathname !== "/signin/") navigate("/signin")
    }

    const handleClick = async () => {
        setErrorMessage("")
        setDisabled(true)
        setButtonText(<CircularProgress />)
        const stripe = await getStripe()
        if (!stripe) return

        const items: Item[] = []
        Object.entries(cartDetails).forEach(([key, value]) =>
            items.push({
                price: key,
                quantity: value.quantity,
            })
        )

        const email = firebase.auth().currentUser?.email as string

        const createCheckoutSession = firebase
            .app()
            .functions("us-east4")
            .httpsCallable("createCheckoutSession")

        const response = await createCheckoutSession({
            person: email,
            items,
            successUrl: `${window.location.origin}/success`,
            cancelUrl: `${window.location.origin}/raffle`,
        })

        if (response.data.status == "error") {
            setErrorMessage(
                "An error occured with creating a checkout session. Please try again"
            )
        } else {
            const { error } = await stripe.redirectToCheckout({
                sessionId: response.data.sessionId as string,
            })

            if (error) {
                setErrorMessage("An error occured. Please try again")
            }
        }

        setDisabled(false)
        setButtonText("Checkout")
    }

    return (
        <>
            {errorMessage !== "" && (
                <Typography align="center">{errorMessage}</Typography>
            )}
            <Button
                onClick={isSignedIn ? handleClick : handleNotSignedIn}
                disabled={disabled}
                fullWidth
                color="primary"
                variant="contained"
            >
                {isSignedIn ? buttonText : "Please Sign In to Checkout"}
            </Button>
        </>
    )
}

export default Checkout
