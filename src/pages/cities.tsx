import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { PageProps, graphql } from "gatsby"
import { CitiesPageQuery } from "graphql-types"
import { IconButton, List, ListItem, Drawer, Divider, Button, Icon } from "@material-ui/core"
import CloseIcon from '@material-ui/icons/Close';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import LocationCityIcon from '@material-ui/icons/LocationCity';

import SEO from "components/seo"

const drawerWidth = 350

const useStyles = makeStyles((theme) => ({
    drawerPaper: { width: drawerWidth, },
    hide: { display: 'none', },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-start',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    content: {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        marginRight: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: 0,
    },
}))

const markers = [
    {name: "Taipei", marginSide: "56.5%", marginTop: "7.5%"},
    {name: "Tainan", marginSide: "34%", marginTop: "61%"},
    {name: "Shifen", marginSide: "51.2%", marginTop: "7%"},
    {name: "Taichung", marginSide: "32%", marginTop: "30%"},
    {name: "Kaohsiung", marginSide: "23%", marginTop: "70%"},
    {name: "Hualien", marginSide: "35.5%", marginTop: "41%"},
];

const elements = (
    <List>
        <ListItem>
            <h1 text-align="center">
                City1
            </h1>
        </ListItem>
        <Divider/>
        <ListItem alignItems="flex-start">
            <p text-align="center">
                info info info info info info info info info info info info info info info info info 
            </p>
        </ListItem>
        <Divider/>
        <ListItem>
            <video>
                no video yet
            </video>
        </ListItem>
        <Divider/>
        <ListItem>
            <text text-align="center">
                Move to next City
            </text>
            <IconButton> {/* on click lets us move to next city */}
                <ChevronRightIcon/>
            </IconButton>
        </ListItem>
    </List>
);

const CitiesPage = ({ data }: PageProps<CitiesPageQuery>) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <>
            <SEO title = "Cities" />
            {/* className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}   transition dont work?? */}
            <div
                style={{
                    height: "100%",
                    width: "100%",
                    position: "fixed",
                    backgroundImage: 'url("/assets/taiwan.png")',
                    backgroundSize: "100% 100%",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center"
                }}
            >
                {markers.map (({ name, marginSide, marginTop}) => (
                    <IconButton key={name} style={{left: marginSide, top: marginTop}} onClick={handleDrawerOpen}>
                        <LocationCityIcon/>
                    </IconButton>
                ))}
            </div>

            <Drawer className={classes.drawer} anchor="right" variant="persistent" open={open} classes={{paper: classes.drawerPaper}}>
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        <CloseIcon/>
                    </IconButton>
                </div>
                {elements}
            </Drawer>
            
        </>
    )
}

export default CitiesPage

export const query = graphql`
    query CitiesPage {
        cities: allMarkdownRemark(
            filter: { frontmatter: { category: { eq: "city" } } }
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
