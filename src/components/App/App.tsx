import React from "react"
import { ThemeProvider, CssBaseline } from "@material-ui/core"
import { Globals } from "react-spring"

import usePrefersReducedMotion from "hooks/usePrefersReducedMotion"
import theme from "./theme"
import Header from "components/Header"
import Footer from "components/Footer"


type Props = {
    children: React.ReactNode
}

const Layout = ({ children }: Props) => {
    const prefersReducedMotion = usePrefersReducedMotion()

    React.useEffect(() => {
        Globals.assign({
            skipAnimation: prefersReducedMotion,
        })
    }, [prefersReducedMotion])
    
    return (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <main>{children}</main>
        <Footer />
    </ThemeProvider>
)}

export default Layout
