import React from "react"
import { PageProps, graphql } from "gatsby"
import { makeStyles } from "@material-ui/core/styles"
import { CitiesPageQuery, CityFragment } from "graphql-types"
import { IconButton, Drawer, List, ListItem, Button } from "@material-ui/core"
import CloseIcon from "@material-ui/icons/Close"
import ChevronRightIcon from "@material-ui/icons/ChevronRight"
import LocationCityIcon from "@material-ui/icons/LocationCity"

import SEO from "components/seo"
import { City } from "components/City"
import useBoop from "hooks/useBoop"
import { animated, useSpring } from "react-spring"

const drawerWidth = "40%"
const maxCities = 6

const useStyles = makeStyles(theme => ({
    container: {
        height: "100%",
        width: "100%",
        position: "absolute",
        top: "0",
        backgroundImage: "url(/assets/cities/sea.svg)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
    },
    drawerPaper: {
        width: drawerWidth,
        zIndex: theme.zIndex.appBar - 1,
        background: "transparent",
        borderLeft: "none",
    },
    hide: { display: "none" },
    drawerHeader: {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: "flex-start",
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    content: {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginRight: "-40%", //drawerWidth
    },
    contentShift: {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: 0,
    },
    styleCity: {},
    styleCityClicked: {
        background: "rgb(236, 252, 240)",
        boxShadow: "rgba(0, 0, 0, .2) 0px 0px 5px 2px",
    },
    toolbar: {
        ...theme.mixins.toolbar,
    },
    taiwanMap: {
        width: "20%",
        height: "75%",
        margin: "0 auto",
        marginTop: "15vh",
    },
}))

const CitiesPage = ({ data }: PageProps<CitiesPageQuery>) => {
    const classes = useStyles()
    const [open, setOpen] = React.useState(true)
    const [cityIndex, setCityIndex] = React.useState(1)
    const [city, setCity] = React.useState(data.taipei)

    const handleDrawerOpen = (
        data: CityFragment | null | undefined,
        num: number
    ) => {
        setOpen(true)
        num >= maxCities ? setCityIndex(0) : setCityIndex(num)
        setCity(data)
    }

    const handleDrawerClose = () => {
        setOpen(false)
    }

    const markers = [
        {
            name: "Taipei",
            marginSide: "50%",
            marginTop: "1%",
            data: data.taipei,
            index: 1,
            icon: "/assets/cities/taipeiIcon.svg",
        },
        {
            name: "Taichung",
            marginSide: "20%",
            marginTop: "26%",
            data: data.taichung,
            index: 2,
            icon: "/assets/cities/taichungIcon.svg",
        },
        {
            name: "Tainan",
            marginSide: "6%",
            marginTop: "55%",
            data: data.tainan,
            index: 3,
            icon: "/assets/cities/tainanIcon.svg",
        },
        {
            name: "Kaohsiung",
            marginSide: "22%",
            marginTop: "65%",
            data: data.kaohsiung,
            index: 4,
            icon: "/assets/cities/kaoshiungIcon.svg",
        },
        {
            name: "Hualien",
            marginSide: "59%",
            marginTop: "35%",
            data: data.hualien,
            index: 5,
            icon: "/assets/cities/hualienIcon.svg",
        },
        {
            name: "Shifen",
            marginSide: "68%",
            marginTop: "-3%",
            data: data.shifen,
            index: 6,
            icon: "/assets/cities/shifenIcon.svg",
        },
    ]
    let i;
    let cityBoops = {}
    for (i=0;i<maxCities;i++) {
        cityBoops[`${i+1}`] = useBoop({ scale: 1.05, rotation: 10 })
    }

    const [nextAnimation, nextTrigger] = useBoop({ x: 3 })
    const [closeAnimation, closeTrigger] = useBoop({ scale: 1.1 })

    const taiwanAnimation = useSpring({marginLeft: open ? '-60%' : '0%'})


    return (
        <>
            <SEO title="Cities" />
            {/* className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}   transition dont work?? */}
            <div className={classes.container}>
                <div
                    className={classes.taiwanMap}
                >
                    <animated.div style={{...taiwanAnimation,...{position: "relative", width: '100%', height: '100%'}}}>
                    <img
                        src={`/assets/cities/taiwanmap.png`}
                        style={{ width: "100%", height: "100%" }}
                    />
                    {markers.map(
                        ({
                            name,
                            marginSide,
                            marginTop,
                            data,
                            index,
                            icon,
                        }) => (
                            <div
                                style={{
                                    left: marginSide,
                                    top: marginTop,
                                    position: "absolute",
                                }}
                            >
                                <IconButton
                                    key={name}
                                    onClick={() =>
                                        handleDrawerOpen(data, index)
                                    }
                                >
                                    <animated.img
                                        src={icon}
                                        style={{...{
                                            width: "60px",
                                            height: "60px",
                                            padding: "3px",
                                            borderRadius: "30px",
                                        },
                                        ...cityBoops[`${index}`][0]}
                                        }
                                        className={
                                            data == city && open
                                                ? classes.styleCityClicked
                                                : classes.styleCity
                                        }
                                        onMouseEnter={cityBoops[`${index}`][1]}
                                    />
                                    {/* <LocationCityIcon className={((data == city) && open ? classes.styleCityClicked : classes.styleCity)}/> */}
                                </IconButton>
                                <div
                                    style={{
                                        color: "white",
                                        position: "absolute",
                                        left: "50%",
                                        transform: "translate(-50%, -50%)",
                                        fontWeight: "bold",
                                        fontSize: "12px",
                                    }}
                                >
                                    {name}
                                </div>
                            </div>
                        )
                    )}
                    </animated.div>
                </div>
            </div>

            <Drawer
                className={classes.drawer}
                anchor="right"
                variant="persistent"
                open={open}
                classes={{ paper: classes.drawerPaper }}
            >
                <div className={classes.toolbar} />
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose} onMouseEnter={closeTrigger}>
                        <animated.span style={{...closeAnimation, ...{height: '24px'}}}>
                            <CloseIcon />
                        </animated.span>
                    </IconButton>
                </div>
                <City city={city} />
                <List>
                    <ListItem style={{ display: "block", textAlign: "center" }}>
                        <Button
                            onClick={() =>
                                handleDrawerOpen(
                                    markers[cityIndex].data,
                                    markers[cityIndex].index
                                )
                            }
                            onMouseEnter={nextTrigger}
                            variant="contained"
                            color="primary"
                        >
                            Next City: {markers[cityIndex].name}
                            <animated.span style={{...nextAnimation, ...{height: '24px', marginLeft: '2px'}}}>
                                <ChevronRightIcon/>
                            </animated.span>
                        </Button>
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
        hualien: markdownRemark(
            frontmatter: { name: { eq: "Hualien" }, category: { eq: "city" } }
        ) {
            ...City
        }
        taipei: markdownRemark(
            frontmatter: { name: { eq: "Taipei" }, category: { eq: "city" } }
        ) {
            ...City
        }
        tainan: markdownRemark(
            frontmatter: { name: { eq: "Tainan" }, category: { eq: "city" } }
        ) {
            ...City
        }
        shifen: markdownRemark(
            frontmatter: { name: { eq: "Shifen" }, category: { eq: "city" } }
        ) {
            ...City
        }
        kaohsiung: markdownRemark(
            frontmatter: { name: { eq: "Kaohsiung" }, category: { eq: "city" } }
        ) {
            ...City
        }
        taichung: markdownRemark(
            frontmatter: { name: { eq: "Taichung" }, category: { eq: "city" } }
        ) {
            ...City
        }
    }
`
