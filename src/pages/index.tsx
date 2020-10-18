import React from "react"
import { Link, PageProps } from "gatsby"
import ReactGlobe from "react-globe"

import SEO from "components/seo"
import SignIn from "components/SignIn"

const IndexPage = ({}: PageProps) => {
    return (
        <>
            <SEO title="Home" />
            <ReactGlobe height="10vh" globeBackgroundTexture={null} />
            <SignIn />
        </>
    )
}

export default IndexPage
