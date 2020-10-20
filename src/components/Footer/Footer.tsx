import React from "react"
import { AppBar, Toolbar, Grid, Hidden, makeStyles } from "@material-ui/core"
import {
    HomeOutlined,
    MapOutlined,
    FastfoodOutlined,
    ConfirmationNumberOutlined,
    PersonOutline,
} from "@material-ui/icons"
import FooterLinkButton from "./FooterLinkButton"

const useStyles = makeStyles(theme => ({
    appbar: {
        top: "auto",
        bottom: 0,
        textDecoration: "none",
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
}))

type Props = {}

const Footer = ({}: Props) => {
    const classes = useStyles()
    return (
        <Hidden mdUp>
            <Toolbar />
            <AppBar
                color="default"
                className={classes.appbar}
                component="footer"
            >
                <Toolbar>
                    <Grid container alignItems="center" justify="space-between">
                        <Grid item xs={2}>
                            <FooterLinkButton
                                to="/"
                                Icon={HomeOutlined}
                                name="Home"
                            />
                        </Grid>

                        <Grid item xs={2}>
                            <FooterLinkButton
                                to="/cities"
                                Icon={MapOutlined}
                                name="Cities"
                            />
                        </Grid>

                        <Grid item xs={2}>
                            <FooterLinkButton
                                to="/food"
                                Icon={FastfoodOutlined}
                                name="Food"
                            />
                        </Grid>

                        <Grid item xs={2}>
                            <FooterLinkButton
                                to="/raffle"
                                Icon={ConfirmationNumberOutlined}
                                name="Raffle"
                            />
                        </Grid>

                        <Grid item xs={2}>
                            <FooterLinkButton
                                to="/profile"
                                Icon={PersonOutline}
                                name="Profile"
                            />
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </Hidden>
    )
}

export default Footer
