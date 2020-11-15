import React from "react"
import { PageProps, graphql } from "gatsby"
import { Grid, makeStyles, Card, Paper } from "@material-ui/core"
import { FoodPageQuery, FoodFragment } from "graphql-types"
import { Food } from "components/Food"
import SwipeableViews from "react-swipeable-views"
import SEO from "components/seo"

const useStyles = makeStyles(theme => ({
    root: {},
}))

const styles = {
    slide: {
        padding: 15,
        minHeight: 100,
        color: "#fff",
    },
}

const FoodPage = ({ data }: PageProps<FoodPageQuery>) => {
    const classes = useStyles()
    const food_lst = [{ data: data.tanghulu }]
    return (
        <>
            <SEO title="Food" />
            <SwipeableViews enableMouseEvents>
                {food_lst.map(({ data }) => (
                    <Food food={data} />
                ))}
            </SwipeableViews>
        </>
    )
}

export default FoodPage

export const query = graphql`
    fragment Food on MarkdownRemark {
        id
        frontmatter {
            name
            imgsrc
            video
        }
        html
    }
    query FoodPage {
        tanghulu: markdownRemark(
            frontmatter: { name: { eq: "Tanghulu" }, category: { eq: "food" } }
        ) {
            ...Food
        }
    }
`
