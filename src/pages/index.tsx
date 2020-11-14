import React from "react"
import { PageProps } from "gatsby"
import ReactGlobe from "react-globe"
import { Typography } from "@material-ui/core"
import { TransitionPageProps } from "gatsby-plugin-transition-link"

import SEO from "components/seo"
import ClientOnly from "components/ClientOnly"

const IndexPage = ({transitionStatus}: PageProps & TransitionPageProps) => {
    console.log(transitionStatus)
    return (
        <>
            <SEO title="Home" />
            <Typography variant="h1" align="center">
                Tour of Taiwan
            </Typography>

            {/* Because ReactGlobe can't be rendered on the server, we have this to hide it. See the README for more*/}
            {typeof window === undefined ? (
                <div style={{ height: "50vh" }} />
            ) : (
                <ReactGlobe height="50vh" globeBackgroundTexture={null} />
            )}
        </>
    )
}

export default IndexPage
