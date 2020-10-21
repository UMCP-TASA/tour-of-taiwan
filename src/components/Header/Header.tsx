import React from "react"
import {
    AppBar,
    Button,
    Toolbar,
    Hidden,
    Typography,
    Grid,
    makeStyles,
} from "@material-ui/core"

import Logo from "components/Logo"
import HeaderLink from "./HeaderLink"
import HeaderProfileMenu from "./HeaderProfileMenu"

const useStyles = makeStyles(theme => ({}))

type Props = {}

const Header = ({}: Props) => {
    const classes = useStyles()
    return (
        <Hidden smDown>
            <AppBar component="header" position="fixed" color="default">
                <Toolbar>
                    <Grid container alignItems="center" justify="space-between">
                        <Grid item>
                            <Grid container alignItems="center">
                                <Logo fill="black" size="50px" />
                                <Typography>Tour of Taiwan</Typography>
                            </Grid>
                        </Grid>

                        <Grid item>
                            <HeaderLink to="/" text="Home" />
                            <HeaderLink to="/cities" text="Cities" />
                            <HeaderLink to="/food" text="Food" />
                            <HeaderLink to="/raffle" text="Raffle" />
                            <HeaderLink to="/profile" text="Profile" />
                        </Grid>

                        <Grid item>
                            <HeaderProfileMenu />
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>

            {/* Additional toolbar here to make sure content doesn't get hidden behind it */}
            <Toolbar />
        </Hidden>
    )
}

export default Header
