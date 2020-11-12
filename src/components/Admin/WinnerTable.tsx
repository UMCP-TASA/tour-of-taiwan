import React from "react"
import firebase from "gatsby-plugin-firebase"
import { useCollection } from "react-firebase-hooks/firestore"
import { Typography, CircularProgress } from "@material-ui/core"
import { DataGrid, RowsProp, ColDef } from "@material-ui/data-grid"

type Props = {}

const columns: ColDef[] = [
    { field: "ticketNum", headerName: "Ticket", sortable: true },
    {
        field: "category",
        headerName: "Category",
        sortable: true,
    },
    {
        field: "prize",
        headerName: "Prize",
        sortable: true,
    },
    { field: "email", headerName: "Email", sortable: true },
]

const WinnerTable = ({}: Props) => {
    const [value, loading, error] = useCollection(
        firebase.firestore().collection("winners")
    )

    const rows: RowsProp = value
        ? value.docs.map(doc => {
              const data = doc.data()
              return {
                  id: doc.id,
                  ticketNum: doc.id,
                  category: data["category"],
                  prize: data["prize"],
                  email: data["person"],
              }
          })
        : []

    return (
        <>
            <Typography align="center" variant="h6">
                Winners
            </Typography>
            {error && <Typography>Error: {JSON.stringify(error)}</Typography>}
            {loading && <CircularProgress />}
            {value && <DataGrid rows={rows} columns={columns} />}
        </>
    )
}

export default WinnerTable
