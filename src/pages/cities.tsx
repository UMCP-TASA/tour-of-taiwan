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

const drawerWidth = '40%'
const maxCities = 6

const useStyles = makeStyles((theme) => ({
    container: {
        height: "100%",
        width: "100%",
        position: "absolute",
        top: '0',
        backgroundImage: 'url(/assets/cities/sea.svg)',
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
    },
    drawerPaper: { 
        width: drawerWidth, 
        zIndex: theme.zIndex.appBar - 1,
        background: 'transparent',
        borderLeft: 'none'
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
        marginRight: '-40%', //drawerWidth
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
    },
    taiwanMap: {
        width: '25%',
        height: '70%',
        margin: '0 auto',
        marginTop: '15vh',
        position: 'relative',
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
        {name: "Taipei", marginSide: "62.8%", marginTop: "5%", data: data.taipei, index: 1},
        {name: "Taichung", marginSide: "22%", marginTop: "30%", data: data.taichung, index: 2},
        {name: "Tainan", marginSide: "10%", marginTop: "65%", data: data.tainan, index: 3},
        {name: "Kaohsiung", marginSide: "20%", marginTop: "75%", data: data.kaohsiung, index: 4},
        {name: "Hualien", marginSide: "70%", marginTop: "30%", data: data.hualien, index: 5},
        {name: "Shifen", marginSide: "77%", marginTop: "4%", data: data.shifen, index: 6},
    ];

    return (
        <>
            <SEO title = "Cities" />
            {/* className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}   transition dont work?? */}
            <div className={classes.container}>
                <div className={classes.taiwanMap} style={{marginLeft: open ? '25%' : 'auto'}}>
                    <img src={`/assets/cities/taiwanmap.png`} style={{width: '100%', height: "100%"}}/>
                    {markers.map (({ name, marginSide, marginTop, data, index}) => (
                        <IconButton key={name} style={{left: marginSide, top: marginTop, position: "absolute"}} onClick={() => handleDrawerOpen(data, index)}>
                            <LocationCityIcon className={((data == city) && open ? classes.styleCityClicked : classes.styleCity)}/>
                        </IconButton>
                    ))}
                </div>
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
                            Next City: {markers[cityIndex].name}
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

//style={{marginLeft: open ? drawerWidth : 'auto'}}

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
