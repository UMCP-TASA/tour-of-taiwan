import React from "react"
import firebase from "gatsby-plugin-firebase"
import { useCollection } from "react-firebase-hooks/firestore"
import { Typography } from "@material-ui/core"
import { DataGrid, RowsProp } from "@material-ui/data-grid"
import { ParentSize } from "@visx/responsive"

const WinnerTable = () => {
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

            <ParentSize>
                {({ width }) => (
                    <DataGrid
                        rows={rows}
                        columns={[
                            {
                                field: "ticketNum",
                                headerName: "Ticket",
                                width: (width - 10) / 4,
                                sortable: true,
                            },
                            {
                                field: "category",
                                headerName: "Category",
                                width: (width - 10) / 4,
                                sortable: true,
                            },
                            {
                                field: "prize",
                                headerName: "Prize",
                                width: (width - 10) / 4,
                                sortable: true,
                            },
                            {
                                field: "email",
                                headerName: "Email",
                                width: (width - 10) / 4,
                                sortable: true,
                            },
                        ]}
                        loading={loading}
                        autoHeight
                        showCellRightBorder
                        error={
                            error ? (
                                <Typography>
                                    Error: {JSON.stringify(error)}
                                </Typography>
                            ) : undefined
                        }
                    />
                )}
            </ParentSize>
        </>
    )
}

export default WinnerTable
