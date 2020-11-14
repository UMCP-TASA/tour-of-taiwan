import React from "react"
import firebase from "gatsby-plugin-firebase"
import { PageProps, graphql } from "gatsby"
import {
    Container,
    Card,
    CardHeader,
    CardContent,
    CircularProgress,
    Grid,
    Typography,
    makeStyles,
} from "@material-ui/core"
import { RafflePageQuery } from "graphql-types"
import { useCollection } from "react-firebase-hooks/firestore"

import SEO from "components/seo"
import { PremiumTickets, StripeItemCard, RaffleTable } from "components/Raffle"
import { LinkButton } from "components/Buttons"
import useIsSignedIn from "hooks/useIsSignedIn"

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(2),
    },
    center: {
        display: "grid",
        placeItems: "center",
    },
}))

const a11yProps = (i: number) => ({
    id: `raffle-tab-option-${i}`,
    "aria-controls": `raffle-tabpanel-${i}`,
})

const RafflePage = ({ data }: PageProps<RafflePageQuery>) => {
    const classes = useStyles()
    const isSignedIn = useIsSignedIn()
    const [value, loading, error] = useCollection(
        isSignedIn
            ? firebase
                  .firestore()
                  .collection("raffle")
                  .where("person", "==", firebase.auth().currentUser?.email)
            : undefined
    )

    const { premium, basic } = data

    const premiumTickets = value?.docs.filter(
        doc => doc.get("category") === "Premium"
    )

    return (
        <>
            <SEO title="Raffle" />
            <Container maxWidth="lg" className={classes.root}>
                <Grid
                    container
                    alignItems="stretch"
                    alignContent="stretch"
                    justify="center"
                    spacing={2}
                >
                    <Grid item xs={12}>
                        <Card className={classes.root}>
                            <CardHeader
                                title={"Purchase Tickets"}
                                titleTypographyProps={{ align: "center" }}
                            />
                            <Grid
                                container
                                alignItems="stretch"
                                alignContent="stretch"
                                justify="center"
                                spacing={2}
                            >
                                {premium && (
                                    <Grid item xs={12} sm={6} md={3}>
                                        <StripeItemCard
                                            title="Premium Tickets"
                                            data={premium.nodes}
                                            description={"Description"}
                                        />
                                    </Grid>
                                )}
                                {basic && (
                                    <Grid item xs={12} sm={6} md={3}>
                                        <StripeItemCard
                                            title="Basic Tickets"
                                            data={basic.nodes}
                                            description={"Description"}
                                        />
                                    </Grid>
                                )}
                            </Grid>
                        </Card>
                    </Grid>

                    <Grid item xs={12}>
                        {isSignedIn ? (
                            <>
                                {error && (
                                    <Typography>
                                        Error: {JSON.stringify(error)}
                                    </Typography>
                                )}
                                {loading && <CircularProgress />}

                                {value && (
                                    <RaffleTable
                                        title={"Owned Tickets"}
                                        value={value}
                                        rowsPerPageOptions={[
                                            5,
                                            10,
                                            20,
                                            50,
                                            100,
                                        ]}
                                    />
                                )}
                            </>
                        ) : (
                            <Card>
                                <CardHeader
                                    title="Please sign in to see your tickets"
                                    titleTypographyProps={{ align: "center" }}
                                />
                                <CardContent className={classes.center}>
                                    <LinkButton
                                        to="/app/signin"
                                        color="primary"
                                        variant="contained"
                                    >
                                        Sign In
                                    </LinkButton>
                                </CardContent>
                            </Card>
                        )}
                    </Grid>

                    <Grid item xs={12}>
                        {isSignedIn && (
                            <PremiumTickets
                                isSignedIn={isSignedIn}
                                docs={premiumTickets}
                                loading={loading}
                                error={error}
                            />
                        )}
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default RafflePage

export const query = graphql`
    query RafflePage {
        premium: allStripePrice(
            filter: {
                product: { name: { regex: "/Premium/" }, active: { eq: true } }
            }
            sort: { fields: unit_amount }
        ) {
            nodes {
                ...StripeItem
            }
        }

        basic: allStripePrice(
            filter: {
                product: { name: { regex: "/Basic/" }, active: { eq: true } }
            }
            sort: { fields: unit_amount }
        ) {
            nodes {
                ...StripeItem
            }
        }
    }
`
