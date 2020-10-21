import React from "react"
import { PageProps } from "gatsby"
import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles(theme => ({
    root: {
        
    },
}))

const FoodPage = ({}: PageProps) => {
    const classes = useStyles()
    return (
        <>
            Food Page
        </>
    )
}

export default FoodPage
