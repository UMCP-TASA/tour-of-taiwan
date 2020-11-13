import React from "react"
import { PageProps, graphql } from "gatsby"
import { Grid, makeStyles, Paper } from "@material-ui/core"
import { FoodPageQuery } from "graphql-types"

import SwipeableViews from 'react-swipeable-views';
import SEO from "components/seo"

const useStyles = makeStyles(theme => ({
    root: {},
}))

const FoodPage = ({ data }: PageProps<FoodPageQuery>) => {
    const classes = useStyles()
    
    return (
        <>
            <SEO title="Food" />
            <SwipeableViews videos>
                <div>
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                    >
                        <Grid item>
                            <img src="" />
                            <Paper>super cool sexy food pic</Paper>
                        </Grid>
                        <Grid item container direction="column">
                            <Grid item>
                                <Paper>TITLEE</Paper>
                            </Grid>
                            <Grid item>
                                <Paper>YT VIDEO</Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </SwipeableViews>
        </>
    )
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
