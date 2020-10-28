import React from "react"
import { graphql } from "gatsby"
import { Button, Card, CardContent, CardHeader } from "@material-ui/core"
import { StripeItemFragment } from "graphql-types"
import { useShoppingCart } from "use-shopping-cart"
import Image from "components/Image"

type Props = {
    item: StripeItemFragment
}

const StripeItemCard = ({ item }: Props) => {
    const { id, active, product, unit_amount, currency } = item
    const { addItem } = useShoppingCart()

    if (!product) {
        console.warn("Product not available")
        return <></>
    }

    const { name, description, localFiles, images } = product

    if(!name) console.warn("Name not listed")
    if(!description) console.warn("No description")
    if(!unit_amount) console.warn("No unit_amount")
    if(!currency) console.warn("No currency")
    if(!images || !images[0]) console.warn("No image provided")

    const handleClick = () => addItem({
        name: name as string, 
        description: description as string,
        sku: id,
        price: unit_amount as number,
        currency: currency as string,
        image: images && images[0] ? images[0] : ""
    })

    return (
        <Card>
            <CardHeader title={name} />
            <CardContent>
                {localFiles && localFiles[0] && <Image image={localFiles[0]} />}
                <Button onClick={handleClick}>Add to cart</Button>
            </CardContent>
        </Card>
    )
}

export default StripeItemCard

export const query = graphql`
    fragment StripeItem on StripePrice {
        id
        active
        product {
            id
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
