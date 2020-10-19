import React from "react"
import { AppBar, Toolbar, Hidden, Typography } from "@material-ui/core"

type Props = {}

const Header = ({}: Props) => {
    return (
        <Hidden smDown>
            <AppBar component="header" position="fixed">
                <Toolbar>
                    <Typography>Tour of Taiwan</Typography>
                </Toolbar>
            </AppBar>
            
            {/* Additional toolbar here to make sure content doesn't get hidden behind it */}
            <Toolbar />
        </Hidden>
    )
}

export default Header
