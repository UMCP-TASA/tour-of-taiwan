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
import {
    PremiumTickets,
    StripeItemCard,
    RaffleTable,
} from "components/Raffle"
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
                    {data.prices.edges.map(item => (
                        <Grid item xs={6} md={4} key={item.node.id}>
                            <StripeItemCard item={item.node} />
                        </Grid>
                    ))}

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
        prices: allStripePrice {
            edges {
                node {
                    ...StripeItem
                }
            }
        }
    }
`
