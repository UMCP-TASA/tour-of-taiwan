import React from "react"
import { Grid, Button, makeStyles } from "@material-ui/core"

import ListCard from "./ListCard"

const useStyles = makeStyles(theme => ({
    root: {
        margin: "auto",
    },
    button: {
        margin: theme.spacing(0.5, 0),
    },
}))

type Props<T> = {
    initialLeft: T[]
    initialRight: T[]
    titleLeft: string
    titleRight: string
    getID: (item: T) => string
}

type ListFunc<T> = (a: T[], b: T[]) => T[]

const TransferList = <T,>({
    initialLeft,
    initialRight,
    titleLeft,
    titleRight,
    getID,
}: Props<T>) => {
    const classes = useStyles()

    // Potentially memo-ize these functions but might not be necessary since lightweight
    const findItem = (item: T, list: T[]) =>
        list.findIndex(i => getID(i) === getID(item))
    const not: ListFunc<T> = (a, b) =>
        a.filter(item => findItem(item, b) === -1)
    const intersection: ListFunc<T> = (a, b) =>
        a.filter(item => findItem(item, b) !== -1)
    const union: ListFunc<T> = (a, b) => [...a, ...not(b, a)]

    const [left, setLeft] = React.useState(initialLeft)
    const [right, setRight] = React.useState(initialRight)

    const [checked, setChecked] = React.useState<T[]>([])
    const leftChecked = intersection(checked, left)
    const rightChecked = intersection(checked, right)

    const handleToggle = (item: T) => () => {
        const currentIndex = findItem(item, checked)
        const newChecked = [...checked]

        if (currentIndex === -1) {
            newChecked.push(item)
        } else {
            newChecked.splice(currentIndex, 1)
        }

        setChecked(newChecked)
    }

    const numberOfChecked = (list: T[]) => intersection(checked, list).length

    const handleToggleAll = (list: T[]) => () => {
        if (numberOfChecked(list) === list.length) {
            setChecked(not(checked, list))
        } else {
            setChecked(union(checked, list))
        }
    }

    const handleCheckedLeft = () => {
        setLeft(left.concat(rightChecked))
        setRight(not(right, rightChecked))
        setChecked(not(checked, rightChecked))
    }

    const handleCheckedRight = () => {
        setRight(right.concat(leftChecked))
        setLeft(not(left, leftChecked))
        setChecked(not(checked, leftChecked))
    }

    const isItemChecked = (item: T) => findItem(item, checked) !== -1

    return (
        <Grid
            container
            className={classes.root}
            spacing={2}
            justify="center"
            alignItems="center"
        >
            <Grid item>
                <ListCard
                    title={titleLeft}
                    list={left}
                    getID={getID}
                    handleToggle={handleToggle}
                    handleToggleAll={handleToggleAll(left)}
                    numberOfChecked={numberOfChecked(left)}
                    isItemChecked={isItemChecked}
                />
            </Grid>
            <Grid item container direction="column" alignItems="center">
                <Button
                    variant="outlined"
                    size="small"
                    className={classes.button}
                    onClick={handleCheckedRight}
                    disabled={leftChecked.length === 0}
                    aria-label="move selected right"
                >
                    {'>'}
                </Button>
                <Button
                    variant="outlined"
                    size="small"
                    className={classes.button}
                    onClick={handleCheckedLeft}
                    disabled={rightChecked.length === 0}
                    aria-label="move selected left"
                >
                    {'<'}
                </Button>
            </Grid>
            <Grid item>
                <ListCard
                    title={titleRight}
                    list={right}
                    getID={getID}
                    handleToggle={handleToggle}
                    handleToggleAll={handleToggleAll(right)}
                    numberOfChecked={numberOfChecked(right)}
                    isItemChecked={isItemChecked}
                />
            </Grid>
        </Grid>
    )
}

export default TransferList
