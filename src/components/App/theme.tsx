/**
 * Our theme component
 * https://material-ui.com/customization/theming/
 */
import { createMuiTheme, responsiveFontSizes } from "@material-ui/core"

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#303f9f",
            contrastText: "#ffffff",
        },
        secondary: {
            main: "#8e24aa",
        },
        text: {
            primary: "#555",
            secondary: "#999",
        }
    },
    shape: {
        borderRadius: 8,
    },
    typography: {
        fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"].join(","),
    },
})

export default responsiveFontSizes(theme)