import React from "react"
import { PageProps, graphql } from "gatsby"
import {
    Container,
    Card,
    CardContent,
    Grid,
    Typography,
    makeStyles,
    Paper,
    Tabs,
    Tab,
} from "@material-ui/core"
import { RafflePageQuery } from "graphql-types"
import firebase from "gatsby-plugin-firebase"
import { useCollection } from "react-firebase-hooks/firestore"

import SEO from "components/seo"
import {
    PremiumTickets,
    RaffleTicketList,
    StripeItemCard,
    RaffleTab,
} from "components/Raffle"
import useIsSignedIn from "hooks/useIsSignedIn"

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(2),
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

    const [curTab, setCurTab] = React.useState(0)
    const handleChange = (__: any, newValue: number) => {
        setCurTab(newValue)
    }

    const basicTickets = value?.docs.filter(
        doc => doc.get("category") === "Basic"
    )

    const premiumTickets = value?.docs.filter(
        doc => doc.get("category") === "Premium"
    )

    return (
        <>
            <SEO title="Raffle" />
            <Container maxWidth="xl" className={classes.root}>
                <Grid
                    container
                    alignItems="stretch"
                    justify="center"
                    alignContent="center"
                    spacing={2}
                >
                    {data.prices.edges.map(item => (
                        <Grid item xs={6} md={4} key={item.node.id}>
                            <StripeItemCard item={item.node} />
                        </Grid>
                    ))}

                    <Grid item xs={12} md={12}>
                        <Card>
                            <CardContent>
                                <Tabs
                                    value={curTab}
                                    variant="fullWidth"
                                    indicatorColor="primary"
                                    textColor="primary"
                                    onChange={handleChange}
                                    aria-label="raffle tabs"
                                >
                                    <Tab label="All" {...a11yProps(0)} />
                                    <Tab label="Basic" {...a11yProps(1)} />
                                    <Tab label="Premium" {...a11yProps(2)} />
                                </Tabs>
                                <RaffleTab value={curTab} index={0}>
                                    <RaffleTicketList
                                        isSignedIn={isSignedIn}
                                        docs={value?.docs}
                                        loading={loading}
                                        error={error}
                                    />
                                </RaffleTab>
                                <RaffleTab value={curTab} index={1}>
                                    <RaffleTicketList
                                        isSignedIn={isSignedIn}
                                        docs={basicTickets}
                                        loading={loading}
                                        error={error}
                                    />
                                </RaffleTab>
                                <RaffleTab value={curTab} index={2}>
                                    <PremiumTickets
                                        isSignedIn={isSignedIn}
                                        docs={premiumTickets}
                                        loading={loading}
                                        error={error}
                                    />
                                </RaffleTab>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={6}></Grid>
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
