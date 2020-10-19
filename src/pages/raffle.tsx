import React from "react"
import { PageProps } from "gatsby"
import firebase from "gatsby-plugin-firebase"
import { useCollection } from "react-firebase-hooks/firestore"
import { Typography } from "@material-ui/core"
import SEO from "components/seo"

const RafflePage = ({}: PageProps) => {
    const [value, loading, error] = useCollection(
        firebase.firestore().collection("raffle").where("person", "==", firebase.auth().currentUser?.uid)
    )

    return (
        <>
        <SEO title="Raffle" />
        <div style={{
            margin: "100px",
        }}>
            {/* {error && <>Error: {JSON.stringify(error)}</>}
            {loading && <>Collection: Loading...</>}
            {value && (
                <>
                    Collection:{" "}
                    {value.docs.map(doc => (
                        <div key={doc.id}>
                            <Typography>
                                {doc.id}
                            </Typography>
                            <Typography>
                                {doc.get('category')}
                            </Typography>
                        </div>
                    ))}
                </>
            )} */}
        </div>
        </>
    )
}

export default RafflePage
