import React from "react"
import { PageProps, graphql } from "gatsby"
import { Grid, makeStyles, Card, Paper } from "@material-ui/core"
import { FoodPageQuery } from "graphql-types"
import CardContent from '@material-ui/core/CardContent'; 
import Typography from '@material-ui/core/Typography';

import SwipeableViews from 'react-swipeable-views';
import SEO from "components/seo"

import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    root: {},
}))

const styles = {
    slide: {
      padding: 15,
      minHeight: 100,
      color: '#fff',
      
    },
  };

const FoodPage = ({ data }: PageProps<FoodPageQuery>) => {
    const classes = useStyles()
    
    return (
        <>
            <SEO title="Food" />
            
            <SwipeableViews enableMouseEvents>
                <div style={Object.assign({}, styles.slide)}>
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
                                    <img height="600" src="/public/assets/shifen.jpg" />
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
                </div>
                <div style={Object.assign({}, styles.slide)}>
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
                                    <img height="600" src="/public/assets/shifen.jpg" />
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
                                        </CardContent>
                                    </Paper>
                                </Grid>
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
