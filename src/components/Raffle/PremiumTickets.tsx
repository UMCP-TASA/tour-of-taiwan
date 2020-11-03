/**
 * Transfer list code from Material-UI Transfer List
 * https://material-ui.com/components/transfer-list/
 */

import React from "react"
import firebase from "gatsby-plugin-firebase"
import { CircularProgress } from "@material-ui/core"
import useIsSignedIn from "hooks/useIsSignedIn"

import { CollectionQuery } from "./index"
import TransferList from "components/TransferList"

type Props = CollectionQuery & {
    isSignedIn?: boolean
}

type Prizes = "Switch" | "Airpods"

type TicketItem = {
    id: string
    doc: firebase.firestore.QueryDocumentSnapshot<
        firebase.firestore.DocumentData
    >
    prevState: Prizes
}

const getID = (item: TicketItem) => item.id

const PremiumTickets = ({
    isSignedIn = useIsSignedIn(),
    docs,
    loading,
    error,
}: Props) => {
    const items: TicketItem[] = docs
        ? docs.map(doc => ({
              id: doc.id,
              doc: doc,
              prevState: doc.get("prize") as Prizes,
          }))
        : []

    return (
        <>
            {loading ? (
                <CircularProgress />
            ) : (
                <TransferList
                    initialLeft={items.filter(
                        item => item.prevState === "Switch"
                    )}
                    initialRight={items.filter(
                        item => item.prevState === "Airpods"
                    )}
                    titleLeft={"Switch Tickets"}
                    titleRight={"Airpods Tickets"}
                    getID={getID}
                />
            )}
        </>
    )
}

export default PremiumTickets
