import React from "react"
import {
    Badge,
    Grid,
    Drawer,
    Divider,
    List,
    ListItem,
    IconButton,
    Typography,
    makeStyles,
} from "@material-ui/core"
import { ShoppingCartOutlined, ArrowForward } from "@material-ui/icons"
import { useShoppingCart } from "use-shopping-cart"
import { AnimatedIconButton } from "components/Buttons"

import Checkout from "./Checkout"
import CartItem from "./CartItem"

const useStyles = makeStyles(theme => ({
    grid: {
        padding: theme.spacing(2),
        paddingBottom: theme.spacing(6),
        height: "100%",
        width: "100%",
    },
    divider: {
        backgroundColor: theme.palette.primary.main,
        width: "100%",
        height: theme.spacing(2),
        borderWidth: "0px",
    },
}))

type Props = {
    className?: string
}

const Cart = ({ className }: Props) => {
    const classes = useStyles()
    const { cartCount, cartDetails, formattedTotalPrice } = useShoppingCart()
    const [open, setOpen] = React.useState(false)
    const handleClose = () => setOpen(false)

    return (
        <>
            <IconButton className={className} onClick={() => setOpen(true)}>
                <Badge badgeContent={cartCount} color="primary">
                    <ShoppingCartOutlined />
                </Badge>
            </IconButton>

            <Drawer open={open} anchor="right" onClose={handleClose}>
                <Grid
                    className={classes.grid}
                    container
                    justify="space-between"
                    direction="column"
                    spacing={1}
                >
                    <Grid item container direction="column" spacing={1}>
                        <Grid item>
                            <AnimatedIconButton
                                onClick={handleClose}
                                from="translate(0px)"
                                to="translate(10px"
                            >
                                <ArrowForward />
                            </AnimatedIconButton>
                        </Grid>

                        <Grid item>
                            <hr className={classes.divider} />
                        </Grid>

                        <Grid item>
                            <List component="div">
                                {Object.entries(cartDetails).map(
                                    ([id, item]) => (
                                        <ListItem
                                            key={id}
                                            divider
                                            disableGutters
                                        >
                                            <CartItem item={item} />
                                        </ListItem>
                                    )
                                )}
                            </List>
                        </Grid>
                    </Grid>

                    <Grid
                        item
                        container
                        direction="column"
                        spacing={2}
                        alignItems="stretch"
                    >
                        <Grid item>
                            <Divider />
                        </Grid>
                        <Grid item container justify="space-between">
                            <Grid item>
                                <Typography>
                                    <b>Subtotal</b>
                                </Typography>
                            </Grid>

                            <Grid item>
                                <Typography align="right">
                                    {formattedTotalPrice}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Checkout />
                        </Grid>
                    </Grid>
                </Grid>
            </Drawer>
        </>
    )
}

export default Cart
