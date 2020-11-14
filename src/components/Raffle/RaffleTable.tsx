import React from "react"
import { TablePaginationProps } from "@material-ui/core"
import { Table } from "components/Table"

type Props = {
    value:
        | firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
        | undefined
    loading?: boolean
    error?: Error
    showEmail?: boolean
    title: string
    rowsPerPageOptions: TablePaginationProps["rowsPerPageOptions"]
}

const ALL_COLUMNS = [
    {
        id: "name",
        label: "Ticket",
    },
    {
        id: "category",
        label: "Category",
    },
    {
        id: "prize",
        label: "Prize",
    },
    {
        id: "email",
        label: "Email",
    },
]

const RaffleTable = ({
    value,
    loading,
    error,
    showEmail = false,
    title,
    rowsPerPageOptions,
}: Props) => {
    const columns = showEmail
        ? ALL_COLUMNS
        : ALL_COLUMNS.slice(0, ALL_COLUMNS.length - 1)

    const rows = value
        ? value.docs.map(doc => {
              const data = doc.data()
              const main = {
                  name: doc.id,
                  category: data["category"],
                  prize: data["prize"],
                  winner: data["winner"],
              }
              return showEmail ? { ...main, email: data["person"] } : main
          })
        : []

    return (
        <Table
            rows={rows}
            headers={columns}
            title={title}
            rowsPerPageOptions={rowsPerPageOptions}
        />
    )
}

export default RaffleTable
