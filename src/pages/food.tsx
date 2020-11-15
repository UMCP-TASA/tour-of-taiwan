import React, { useState } from "react"
import { PageProps, graphql } from "gatsby"
import {
    Grid,
    makeStyles,
    Card,
    Paper,
    Button,
    IconButton,
} from "@material-ui/core"
import { FoodPageQuery, FoodFragment } from "graphql-types"
import { Food } from "components/Food"
import SwipeableViews from "react-swipeable-views"
import ChevronRightIcon from "@material-ui/icons/ChevronRight"
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"

import SEO from "components/seo"

const useStyles = makeStyles(theme => ({
    container: {
        height: "100%",
        width: "100%",
        position: "absolute",
        top: "0",
        backgroundImage: "url(/assets/foodBackground.svg)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        textAlign: "center",
    },
}))

const FoodPage = ({ data }: PageProps<FoodPageQuery>) => {
    const classes = useStyles()
    const food_lst = [{ data: data.tanghulu }, { data: data.tanghulu }]

    const [currIndex, setCurrIndex] = useState(0)

    const handleLeftClick = () => {
        if (currIndex == 0) {
            setCurrIndex(food_lst.length - 1)
        } else {
            setCurrIndex(currIndex - 1)
        }
    }

    const handleRightClick = () => {
        if (currIndex == food_lst.length - 1) {
            setCurrIndex(0)
        } else {
            setCurrIndex(currIndex + 1)
        }
    }

    return (
        <>
            <SEO title="Food" />
            <div className={classes.container}>
                <IconButton
                    onClick={handleLeftClick}
                    style={{ position: "absolute", left: "5%", top: "50%" }}
                >
                    <ChevronLeftIcon />
                </IconButton>
                <div
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
                >
                    <SwipeableViews
                        enableMouseEvents
                        index={currIndex}
                        onChangeIndex={index => setCurrIndex(index)}
                    >
                        {food_lst.map(({ data }) => (
                            <Food food={data} />
                        ))}
                    </SwipeableViews>
                </div>
                <IconButton
                    onClick={handleRightClick}
                    style={{ position: "absolute", right: "5%", top: "50%" }}
                >
                    <ChevronRightIcon />
                </IconButton>
                <p>Navigate by swiping or using the arrows!</p>
            </div>
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
