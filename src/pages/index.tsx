import React from "react"
import { PageProps } from "gatsby"
import ReactGlobe from "react-globe"
import { Typography } from "@material-ui/core"

import SEO from "components/seo"
import ClientOnly from "components/ClientOnly"

const IndexPage = ({}: PageProps) => {
    return (
        <>
            <SEO title="Home" />
            <Typography variant="h1" align="center">
                Tour of Taiwan
            </Typography>
            {typeof window === undefined ? (
                <div style={{ height: "50vh" }} />
            ) : (
                <ReactGlobe height="50vh" globeBackgroundTexture={null} />
            )}
        </>
    )
}

export default IndexPage
