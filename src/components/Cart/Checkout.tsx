import React from "react"
import firebase from "gatsby-plugin-firebase"
import { useShoppingCart } from "use-shopping-cart"
import { Button } from "@material-ui/core"

import { getStripe } from "utils/stripe"
import useIsSignedIn from "hooks/useIsSignedIn"

type Item = {
    price: string
    quantity: number
}

const Checkout = () => {
    const { cartDetails } = useShoppingCart()
    const isSignedIn = useIsSignedIn()
    const [buttonText, setbuttonText] = React.useState<React.ReactNode>("Checkout")

    const handleClick = async () => {
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
            customerEmail: "example@example.com"
        })
    }

    return <Button onClick={handleClick}>
        {buttonText}
    </Button>
}

export default Checkout
