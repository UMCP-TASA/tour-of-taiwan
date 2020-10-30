import React from "react"
import { graphql, PageProps } from "gatsby"
import { Grid, Container, Typography } from "@material-ui/core"
import { useShoppingCart } from "use-shopping-cart"
import { LinkButton } from "components/Buttons"

import SEO from "components/seo"

const SuccessPage = ({}: PageProps) => {
    const { clearCart } = useShoppingCart()

    React.useEffect(() => {
        clearCart()
    }, [])
    return (
        <>
            <SEO title="Success" />
            <Container maxWidth="lg">
                <Grid
                    container
                    alignItems="center"
                    direction="column"
                    spacing={4}
                >
                    <Grid item>
                        <Typography variant="h1" align="center">
                            Successfully purchased tickets!
                        </Typography>
                    </Grid>

                    <Grid item>
                        <Typography variant="h4" align="center">
                            Your tickets may take a while to generate! If they
                            do not show up in your dashboard within 15 minutes,
                            please email us at <b>umcptasa@gmail.com</b>
                        </Typography>
                    </Grid>

                    <Grid item>
                        <LinkButton to="/raffle" fullWidth>
                            Return to Dashboard
                        </LinkButton>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default SuccessPage
