import React from "react"
import { AppBar, Toolbar, Hidden, Typography } from "@material-ui/core"
import Logo from "components/Logo"

type Props = {}

const Header = ({}: Props) => {
    return (
        <Hidden smDown>
            <AppBar component="header" position="fixed" color="default">
                <Toolbar>
                    <Logo fill="black" size={50}/>
                    <Typography>Tour of Taiwan</Typography>
                </Toolbar>
            </AppBar>
            
            {/* Additional toolbar here to make sure content doesn't get hidden behind it */}
            <Toolbar />
        </Hidden>
    )
}

export default Header
