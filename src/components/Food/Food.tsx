import React from "react"
import { FoodFragment } from "graphql-types"
import { Grid, makeStyles, Card, Hidden, Typography } from "@material-ui/core"

import { getEmbedUrl } from "@utils"

const useStyles = makeStyles(theme => ({
    root: {
        [theme.breakpoints.up("md")]: {
            height: "70vh",
        },
    },
    content: {
        height: "100%",
    },
    body: {
        // overflow: "scroll",
    },
}))

type Props = {
    food: FoodFragment | null | undefined
}

export default function Food({ food }: Props) {
    const classes = useStyles()

    if (!food) {
        throw new Error("Food does not exist")
    }

    if (!food.frontmatter) {
        throw new Error("Frontmatter does not exist")
    }

    if (!food.frontmatter.imgsrc) {
        throw new Error("Frontmatter does not exist")
    }

    let video = null
    if (food.frontmatter.video) {
        video = <iframe
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
    }

    return (
        <Card className={classes.root}>
            <Grid
                container
                className={classes.content}
                justify="space-between"
                alignItems="stretch"
                style={{overflowY: 'scroll'}}
            >
                <Hidden mdUp>
                    <Grid item xs={12}>
                        <Typography
                            gutterBottom
                            variant="h3"
                            component="h2"
                            align="center"
                            color="textPrimary"
                            style={{ fontWeight: "bold"}}
                        >
                            {food.frontmatter.name}
                        </Typography>
                    </Grid>
                </Hidden>
                <Grid item xs={12} md={6}>
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
                <Grid item xs={12} md={6} style={{ padding: "10px" }}>
                    <Hidden smDown>
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
                    </Hidden>
                    {video}
                    {food.html && (
                        <div
                            className={classes.body}
                            dangerouslySetInnerHTML={{ __html: food.html }}
                        />
                    )}
                </Grid>
            </Grid>
        </Card>
    )
}
