import React from "react"
import { FoodFragment } from "graphql-types"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import { Grid, makeStyles, Card, Paper } from "@material-ui/core"

type Props = {
    food: FoodFragment | null | undefined
}

export default function Food({ food }: Props) {
    if (!food) {
        throw new Error("City does not exist")
    }

    if (!food.frontmatter) {
        throw new Error("Frontmatter does not exist")
    }

    if (!food.frontmatter.imgsrc) {
        throw new Error("Frontmatter does not exist")
    }

    if (!food.frontmatter.video) {
        throw new Error("Frontmatter does not exist")
    }

    function getEmbedUrl(url: string) {
        var reg = /(?:http?s?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/g
        var match = reg.exec(url)
        if (match != null) {
            return "https://www.youtube.com/embed/" + match[1]
        }
        return "https://www.youtube.com/embed/A9fdHs1uxGo" //random taiwan vid that should never show up
    }

    return (
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="stretch"
            style={{ height: "80vh" }}
        >
            <Grid item xs={6}>
                <img
                    src={food.frontmatter.imgsrc}
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "20px",
                        padding: "10px",
                    }}
                />
            </Grid>
            <Grid item xs={6} style={{ padding: "10px" }}>
                <Typography
                    gutterBottom
                    variant="h3"
                    component="h2"
                    align="center"
                    color="textPrimary"
                    style={{ fontWeight: "bold", padding: "10px 0px" }}
                >
                    {food.frontmatter.name}
                </Typography>
                <iframe
                    src={getEmbedUrl(food.frontmatter.video)}
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    frameBorder="0"
                    allowFullScreen
                    style={{
                        borderRadius: "7px",
                        width: "100%",
                        height: "35vh",
                    }}
                />
                <div dangerouslySetInnerHTML={{ __html: food.html }} />
            </Grid>
        </Grid>
    )
    //     <Grid item>
    //     <Typography gutterBottom variant="h5" component="h2" align='center' color='textPrimary'>
    //         Swipe To Explore!
    //     </Typography>
    // </Grid>
}
