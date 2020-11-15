import React from "react"
import { PageProps, graphql } from "gatsby"
import { Grid, makeStyles, Card, Paper } from "@material-ui/core"
import { FoodPageQuery, FoodFragment } from "graphql-types"
import { Food } from "components/Food"
import SwipeableViews from "react-swipeable-views"
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
    },
}))

const FoodPage = ({ data }: PageProps<FoodPageQuery>) => {
    const classes = useStyles()
    const [index, setIndex] = React.useState(0)
    const handleNext = () => {
        setIndex((prevIndex) => prevIndex + 1)
    }

    const handleBack = () => {
        setIndex((prevIndex) => prevIndex - 1)
    }

    const handleChange = (newIndex: number) => {
        setIndex(newIndex)
    }
    const food_lst = [{ data: data.tanghulu }, { data: data.tanghulu }]
    return (
        <>
            <SEO title="Food" />
            <div className={classes.container}>
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
                    <SwipeableViews enableMouseEvents index={index} onChangeIndex={handleChange}>
                        {food_lst.map(({ data }) => (
                            <Food food={data} key={data?.id}/>
                        ))}
                    </SwipeableViews>
                </div>
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
