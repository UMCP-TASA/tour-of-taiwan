import React from "react"
import { PageProps, graphql } from "gatsby"
import { Grid, Typography, makeStyles } from "@material-ui/core"
import { RafflePageQuery } from "graphql-types"
import firebase from "gatsby-plugin-firebase"
import { useCollection } from "react-firebase-hooks/firestore"

import SEO from "components/seo"
import ClientOnly from "components/ClientOnly"
import { PremiumTickets, RaffleCard, StripeItemCard } from "components/Raffle"
import useIsSignedIn from "hooks/useIsSignedIn"

const useStyles = makeStyles(theme => ({
    grid: {
        padding: theme.spacing(1),
    },
}))

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

    return (
        <>
            <SEO title="Raffle" />
            <Grid
                container
                alignItems="center"
                justify="center"
                className={classes.grid}
            >
                {data.prices.edges.map(item => (
                    <Grid item xs={12} md={6} key={item.node.id}>
                        <StripeItemCard item={item.node} />
                    </Grid>
                ))}

                <Grid item xs={12} md={6}>
                    <RaffleCard
                        isSignedIn={isSignedIn}
                        docs={value?.docs.filter(
                            doc => doc.get("category") === "Basic"
                        )}
                        loading={loading}
                        error={error}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <PremiumTickets
                        isSignedIn={isSignedIn}
                        docs={value?.docs.filter(
                            doc => doc.get("category") === "Premium"
                        )}
                        loading={loading}
                        error={error}
                    />
                </Grid>
            </Grid>
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
