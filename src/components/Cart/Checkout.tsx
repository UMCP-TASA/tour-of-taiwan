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

const Checkout = () => {
    const { cartDetails } = useShoppingCart()
    const isSignedIn = useIsSignedIn()
    const [disabled, setDisabled] = React.useState(false)
    const [buttonText, setButtonText] = React.useState<React.ReactNode>(
        "Checkout"
    )
    const [errorMessage, setErrorMessage] = React.useState("")

    const handleClick = async () => {
        if (!isSignedIn) navigate("/signin")

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
        const { error } = await stripe.redirectToCheckout({
            lineItems: items,
            mode: "payment",
            successUrl: `${window.location.origin}/success`,
            cancelUrl: `${window.location.origin}/raffle`,
            clientReferenceId: firebase.auth().currentUser?.uid,
            customerEmail: "example@example.com",
        })

        if (error) {
            setErrorMessage("An error occured. Please try again")
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
                onClick={handleClick}
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
