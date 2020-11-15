import React from "react"
import { PageProps, graphql } from "gatsby"
import { Button, Grid, Hidden, IconButton, makeStyles } from "@material-ui/core"
import { ArrowBackIosRounded, ArrowForwardIosRounded } from "@material-ui/icons"

import SwipeableViews from "react-swipeable-views"

import FoodBackground from "assets/food/foodBackground.svg"

import { FoodPageQuery, FoodFragment } from "graphql-types"
import { Food } from "components/Food"
import SEO from "components/seo"

const useStyles = makeStyles(theme => ({
    background: {
        height: "100%",
        width: "100%",
        position: "absolute",
        top: "0",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
    },
    center: {
        display: "grid",
        placeItems: "center",
        padding: theme.spacing(2),

        [theme.breakpoints.up("md")]: {
            height: "80vh",
        },
    },
}))

const FoodPage = ({ data }: PageProps<FoodPageQuery>) => {
    const classes = useStyles()
    const [index, setIndex] = React.useState(0)
    const handleNext = () => {
        setIndex(prevIndex => prevIndex + 1)
    }

    const handleBack = () => {
        setIndex(prevIndex => prevIndex - 1)
    }

    const handleChange = (newIndex: number) => {
        setIndex(newIndex)
    }
    const food_lst = data.food.nodes
    return (
        <>
            <SEO title="Food" />
            <FoodBackground className={classes.background} />
            <div className={classes.center}>
                <Grid
                    container
                    alignItems="center"
                    justify="center"
                    spacing={1}
                >
                    <Hidden smDown>
                        <Grid item>
                            <IconButton
                                onClick={handleBack}
                                disabled={index == 0}
                            >
                                <ArrowBackIosRounded />
                            </IconButton>
                        </Grid>
                    </Hidden>

                    <Grid item xs={12} md={10}>
                        <SwipeableViews
                            enableMouseEvents
                            index={index}
                            onChangeIndex={handleChange}
                        >
                            {food_lst.map((data) => (
                                <Food food={data} key={data?.id} />
                            ))}
                        </SwipeableViews>
                    </Grid>

                    <Hidden smDown>
                        <Grid item>
                            <IconButton
                                onClick={handleNext}
                                disabled={index == food_lst.length - 1}
                            >
                                <ArrowForwardIosRounded />
                            </IconButton>
                        </Grid>
                    </Hidden>

                    <Hidden mdUp>
                        <Grid item xs={6}>
                            <Button
                                onClick={handleBack}
                                variant="contained"
                                fullWidth
                                disabled={index == 0}
                                color="primary"
                            >
                                Back
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button
                                onClick={handleNext}
                                variant="contained"
                                fullWidth
                                disabled={index == food_lst.length - 1}
                                color="primary"
                            >
                                Next
                            </Button>
                        </Grid>
                    </Hidden>
                </Grid>
            </div>

            {/* <div
                    style={{
                        width: "80%",
                        height: "80vh",
                        backgroundColor: "#fff",
                        boxShadow: "rgba(0, 0, 0, .2) 0px 0px 5px 2px",
                        marginLeft: "50%",
                        marginTop: "7%",
                        transform: "translate(-50%)",
                        borderRadius: "20px",
                    }}
                > */}

            {/* </div> */}
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

    fragment FoodImage on File {
        childImageSharp {
            fluid(quality: 100, pngQuality: 100, maxHeight: 1000) {
                ...GatsbyImageSharpFluid_withWebp
            }
        }
    }
    
    query FoodPage {
        food: allMarkdownRemark(filter: {frontmatter: {category: {eq: "food"}}}) {
          nodes {
            ...Food
          }
        }
        images: allFile(filter: {absolutePath: {regex: "/static\/assets/"}}) {
          edges {
            node {
              ...FoodImage
            }
          }
        }
      }
`
