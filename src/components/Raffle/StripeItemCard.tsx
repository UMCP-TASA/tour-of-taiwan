import React from "react"
import { graphql } from "gatsby"
import {
    Button,
    Card,
    CardActionArea,
    CardContent,
    CardHeader,
    Typography,
    makeStyles,
} from "@material-ui/core"
import { StripeItemFragment } from "graphql-types"
import { useShoppingCart } from "use-shopping-cart"
import Image from "components/Image"

const useStyles = makeStyles(theme => ({
    root: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
    },
    content: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
        flexShrink: 1,
    },
    actionArea: {
        flexGrow: 1,
        marginLeft: "auto",
        marginRight: "auto",
        padding: theme.spacing(2),
    },
}))

type Props = {
    item: StripeItemFragment
}

const StripeItemCard = ({ item }: Props) => {
    const classes = useStyles()
    const { id, product, unit_amount, currency } = item
    const { addItem } = useShoppingCart()

    if (!product) {
        console.warn("Product not available")
        return <></>
    }

    const { name, description, localFiles, images, active } = product

    if (!active) return <></>

    if (!name) console.warn("Name not listed")
    if (!description) console.warn("No description")
    if (!unit_amount) console.warn("No unit_amount")
    if (!currency) console.warn("No currency")
    if (!images || !images[0]) console.warn("No image provided")

    const handleClick = () =>
        addItem({
            name: name as string,
            description: description as string,
            sku: id,
            price: unit_amount as number,
            currency: currency as string,
            image: images && images[0] ? images[0] : "",
        })

    return (
        <Card className={classes.root}>
            <div className={classes.content}>
                {localFiles && localFiles[0] && <Image image={localFiles[0]} />}
                <CardHeader
                    title={name}
                    titleTypographyProps={{ align: "center" }}
                    subheader={description}
                    subheaderTypographyProps={{ align: "center" }}
                />
            </div>
            <CardActionArea
                className={classes.actionArea}
                onClick={handleClick}
            >
                <Typography align="center">Add to cart</Typography>
            </CardActionArea>
        </Card>
    )
}

export default StripeItemCard

export const query = graphql`
    fragment StripeItem on StripePrice {
        id
        product {
            id
            active
            description
            name
            images
            localFiles {
                ...Image
            }
        }
        unit_amount
        currency
    }
`
