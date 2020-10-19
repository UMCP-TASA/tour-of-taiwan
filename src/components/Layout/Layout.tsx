import React from "react"
import { ThemeProvider, CssBaseline } from "@material-ui/core"
import theme from "./theme"
import Header from "./Header"
import Footer from "./Footer"

type Props = {
    children: React.ReactNode
}

const Layout = ({ children }: Props) => (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <main>{children}</main>
        <Footer />
    </ThemeProvider>
)

export default Layout
