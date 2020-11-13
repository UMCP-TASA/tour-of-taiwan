import React from "react"
import { Typography } from "@material-ui/core"
import { DataGrid, RowsProp, ColDef } from "@material-ui/data-grid"
import withParentSize, { WithParentSizeProps, 
    WithParentSizeProvidedProps,
} from "@visx/responsive/lib/enhancers/withParentSize"

type Props = WithParentSizeProps & WithParentSizeProvidedProps & {
    value:
        | firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
        | undefined
    loading?: boolean
    error?: Error
    showEmail?: boolean
}

const ALL_COLUMNS: ColDef[] = [
    {
        field: "ticketNum",
        headerName: "Ticket",
        sortable: true,
    },
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
    {
        field: "email",
        headerName: "Email",
        sortable: true,
    },
]

const RaffleTable = ({
    parentWidth = 100,
    value,
    loading,
    error,
    showEmail = false,
}: Props) => {
    const numColumns = showEmail ? ALL_COLUMNS.length : ALL_COLUMNS.length - 1
    const colWidth = (parentWidth - 10) / numColumns

    const columns: ColDef[] = ALL_COLUMNS.map(col => ({
        ...col,
        width: colWidth,
        hide: col.field === "email" && !showEmail,
    }))

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
        <DataGrid
            rows={rows}
            columns={columns}
            loading={loading}
            autoHeight
            showCellRightBorder
            error={
                error ? (
                    <Typography>Error: {JSON.stringify(error)}</Typography>
                ) : undefined
            }
        />
    )
}

export default withParentSize<Props>(RaffleTable)
