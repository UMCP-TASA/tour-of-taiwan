import React from "react"
import { AppBar, Toolbar, Typography } from "@material-ui/core"

type Props = {}

const Header = ({}: Props) => {
    return (
        <AppBar component="header">
            <Toolbar>
                <Typography>Tour of Taiwan</Typography>
            </Toolbar>
        </AppBar>
    )
}

export default Header