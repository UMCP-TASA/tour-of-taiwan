import React from "react"
import { FoodFragment } from "graphql-types"
import CardContent from '@material-ui/core/CardContent'; 
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Grid, makeStyles, Card, Paper } from "@material-ui/core"

type Props = { 
    food: FoodFragment | null | undefined
}

export default function Food({food} : Props) {

    if (!food) {
        throw new Error("City does not exist")
    }

    if (!food.frontmatter) {
        throw new Error("Frontmatter does not exist");
    }

    if (!food.frontmatter.imgsrc) {
        throw new Error("Frontmatter does not exist");
    }

    if (!food.frontmatter.video) {
        throw new Error("Frontmatter does not exist");
    }
        
    return (
        <Grid
            container
            direction="column">
            spacing={4}
            <Grid item>
                <Typography gutterBottom variant="h5" component="h2" align='center' color='textPrimary'>
                    Swipe To Explore!
                </Typography>
            </Grid>
            <Grid item>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    spacing={3}
                >
                    <Grid item> 
                        <img height="600" src={food.frontmatter.imgsrc} />
                    </Grid>
                    <Grid item>
                        <Paper elevation={2}> 
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2" align='center' color='textPrimary'>
                                    HUALIEN
                                </Typography>
                                <Typography variant="body2" component="p" color='textPrimary'>
                                    info info info description
                                    <br></br>infoasdfo description
                                </Typography> 
                                <Button variant="outlined" color="primary" href="">Youtube</Button>
                            </CardContent>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}