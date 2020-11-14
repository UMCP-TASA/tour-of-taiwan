import React from "react"
import firebase from "gatsby-plugin-firebase"
import { useCollection } from "react-firebase-hooks/firestore"
import { Typography } from "@material-ui/core"
import { RaffleTable } from "components/Raffle"

const WinnerTable = () => {
    const [value, loading, error] = useCollection(
        firebase.firestore().collection("winners")
    )

    return (
        <>
            <Typography align="center" variant="h6">
                Winners
            </Typography>

            <RaffleTable
                value={value}
                loading={loading}
                error={error}
                showEmail
            />
        </>
    )
}

export default WinnerTable
