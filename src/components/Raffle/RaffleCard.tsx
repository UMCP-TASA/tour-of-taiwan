import React from "react"
import firebase from "gatsby-plugin-firebase"
import { useCollection } from "react-firebase-hooks/firestore"
import {
    Card,
    CardContent,
    CircularProgress,
    Typography,
} from "@material-ui/core"

type Props = {}

/**
 * Should only be called when authenticated
 * @param param0
 */
const RaffleCard = ({}: Props) => {
    if (firebase.auth().currentUser === null) {
        console.warn("Firebase not authenticated")
        return <></>
    }

    const [value, loading, error] = useCollection(
        firebase
            .firestore()
            .collection("raffle")
            .where("person", "==", firebase.auth().currentUser?.uid)
    )
    return (
        <Card raised>
            <CardContent>
                {error && (
                    <Typography>Error: {JSON.stringify(error)}</Typography>
                )}
                {loading && <CircularProgress />}
                {value && (
                    <>
                        Collection:{" "}
                        {value.docs.map(doc => (
                            <div key={doc.id}>
                                <Typography>{doc.id}</Typography>
                                <Typography>{doc.get("category")}</Typography>
                            </div>
                        ))}
                    </>
                )}
            </CardContent>
        </Card>
    )
}

export default RaffleCard
