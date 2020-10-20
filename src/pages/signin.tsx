import React from "react"
import { PageProps } from "gatsby"

import SEO from "components/seo"
import SignIn from "components/SignIn"

const SignInPage = ({}: PageProps) => {
    return (
        <>
            <SEO title="Sign In" />
            <SignIn />
        </>
    )
}

export default SignInPage
