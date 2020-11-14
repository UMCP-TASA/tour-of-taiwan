import React from "react"
import { PageProps, graphql } from "gatsby"
import { makeStyles } from "@material-ui/core/styles"
import { CitiesPageQuery, CityFragment } from "graphql-types"
import { IconButton, Drawer, List, ListItem } from "@material-ui/core"
import CloseIcon from '@material-ui/icons/Close';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import LocationCityIcon from '@material-ui/icons/LocationCity';

import SEO from "components/seo"
import { City } from "components/City"

const drawerWidth = 350
const maxCities = 6

const useStyles = makeStyles((theme) => ({
    container: {
        height: "100%",
        width: "100%",
        position: "absolute",
        backgroundImage: 'url(/assets/cities/taiwan.png)',
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
    },
    drawerPaper: { 
        width: drawerWidth, 
        zIndex: theme.zIndex.appBar - 1,
    },
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
    styleCity: {
        color: "grey",
    },
    styleCityClicked: {
        color: "red",
    },
    toolbar: {
        ...theme.mixins.toolbar,
    }
}))


const CitiesPage = ({ data }: PageProps<CitiesPageQuery>) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const [cityIndex, setCityIndex] = React.useState(1);
    const [city, setCity] = React.useState(data.taipei);

    const handleDrawerOpen = (data : CityFragment | null | undefined, num : number) => {
        setOpen(true);
        num >= maxCities ? setCityIndex(0) : setCityIndex(num);
        setCity(data);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const markers = [
        {name: "Taipei", marginSide: "56.8%", marginTop: "16.5%", data: data.taipei, index: 1},
        {name: "Tainan", marginSide: "38%", marginTop: "69.5%", data: data.tainan, index: 2},
        {name: "Shifen", marginSide: "59.5%", marginTop: "16%", data: data.shifen, index: 3},
        {name: "Taichung", marginSide: "44%", marginTop: "39%", data: data.taichung, index: 4},
        {name: "Kaohsiung", marginSide: "39.5%", marginTop: "79%", data: data.kaohsiung, index: 5},
        {name: "Hualien", marginSide: "56%", marginTop: "50%", data: data.hualien, index: 6},
    ];

    return (
        <>
            <SEO title = "Cities" />
            {/* className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}   transition dont work?? */}
            <div className={classes.container}>
                {markers.map (({ name, marginSide, marginTop, data, index}) => (
                    <IconButton key={name} style={{left: marginSide, top: marginTop, position: "fixed"}} onClick={() => handleDrawerOpen(data, index)}>
                        <LocationCityIcon className={((data == city) && open ? classes.styleCityClicked : classes.styleCity)}/>
                    </IconButton>
                ))}
            </div>

            <Drawer className={classes.drawer} anchor="right" variant="persistent" open={open} classes={{paper: classes.drawerPaper}}>
                <div className={classes.toolbar}/>
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        <CloseIcon/>
                    </IconButton>
                </div>
                <City city={city}/>
                <List>
                        <ListItem style={{display: "block", textAlign: "center"}}>
                        <text style={{textAlign: "center"}}>
                            Move to {markers[cityIndex].name}
                        </text>
                        <IconButton onClick={() => handleDrawerOpen(markers[cityIndex].data, markers[cityIndex].index)}>
                            <ChevronRightIcon/>
                        </IconButton>
                    </ListItem>
                </List>
            </Drawer>
        </>
    )
}

export default CitiesPage

export const query = graphql`
fragment City on MarkdownRemark {
    id
    frontmatter {
      name
      imgsrc
      video
    }
    html
  }
    query CitiesPage {
        hualien: markdownRemark(frontmatter: {name: {eq: "Hualien"}, category: {eq: "city"}}) {
            ...City
          }
          taipei: markdownRemark(frontmatter: {name: {eq: "Taipei"}, category: {eq: "city"}}) {
            ...City
          }
          tainan: markdownRemark(frontmatter: {name: {eq: "Tainan"}, category: {eq: "city"}}) {
            ...City
          }
          shifen: markdownRemark(frontmatter: {name: {eq: "Shifen"}, category: {eq: "city"}}) {
            ...City
          }
          kaohsiung: markdownRemark(frontmatter: {name: {eq: "Kaohsiung"}, category: {eq: "city"}}) {
            ...City
          }
          taichung: markdownRemark(frontmatter: {name: {eq: "Taichung"}, category: {eq: "city"}}) {
            ...City
          }
    }
`
