import React from "react"
import { Badge, Button, Drawer, IconButton, makeStyles } from "@material-ui/core"
import { ShoppingCartOutlined } from "@material-ui/icons"
import { useShoppingCart } from "use-shopping-cart"

import Checkout from "./Checkout"

type Props = {}

const Cart = ({}: Props) => {
    const { cartCount, cartDetails, redirectToCheckout } = useShoppingCart()
    const [open, setOpen] = React.useState(false)
    const handleClose = () => setOpen(false)

    return (
        <>
            <IconButton onClick={() => setOpen(true)}>
                <Badge badgeContent={cartCount} color="primary">
                    <ShoppingCartOutlined />
                </Badge>
            </IconButton>

            <Drawer open={open} anchor="right" onClose={handleClose}>
                <Checkout />
            </Drawer>
        </>
    )
}

export default Cart
