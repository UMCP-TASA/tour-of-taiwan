import React from "react"
import {
    Card,
    CardHeader,
    Checkbox,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from "@material-ui/core"

type Props<T> = {
    title: string
    list: T[]
    getID: (item: T) => string
    handleToggle: (item: T) => () => void
    handleToggleAll: () => void
    numberOfChecked: number
    isItemChecked: (item: T) => boolean
}

const ListCard = <T,>({
    title,
    list,
    getID,
    handleToggle,
    handleToggleAll,
    numberOfChecked,
    isItemChecked,
}: Props<T>) => (
    <Card>
        <CardHeader
            title={title}
            subheader={`${numberOfChecked}/${list.length} selected`}
            avatar={
                <Checkbox
                    onClick={handleToggleAll}
                    checked={
                        numberOfChecked === list.length && list.length !== 0
                    }
                    indeterminate={
                        numberOfChecked !== list.length && list.length !== 0
                    }
                    disabled={list.length === 0}
                    inputProps={{
                        "aria-label": "all items selected",
                    }}
                />
            }
        />
        <Divider />
        <List dense component="div" role="list">
            {list.map(item => {
                const id = getID(item)
                const labelId = `transfer-list-all-item-${id}-label`

                return (
                    <ListItem
                        key={id}
                        role="listitem"
                        button
                        onClick={handleToggle(item)}
                    >
                        <ListItemIcon>
                            <Checkbox
                                checked={isItemChecked(item)}
                                tabIndex={-1}
                                disableRipple
                                inputProps={{ "aria-labelledby": labelId }}
                            />
                        </ListItemIcon>
                        <ListItemText id={labelId} primary={id} />
                    </ListItem>
                )
            })}
        </List>
    </Card>
)

export default ListCard