import React from "react"
import { PageProps, graphql } from "gatsby"
import { makeStyles } from "@material-ui/core"
import { FoodPageQuery } from "graphql-types"

const useStyles = makeStyles(theme => ({
    root: {},
}))

const FoodPage = ({ data }: PageProps<FoodPageQuery>) => {
    const classes = useStyles()
    return <>Food Page</>
}

export default FoodPage

export const query = graphql`
    query FoodPage {
        food: allMarkdownRemark(
            filter: { frontmatter: { category: { eq: "food" } } }
        ) {
            nodes {
                id
                frontmatter {
                    name
                    imgsrc
                    video
                }
                html
            }
        }
    }
`
