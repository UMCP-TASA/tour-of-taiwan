import React from "react"
import AniLink, { AniLinkProps } from "gatsby-plugin-transition-link/AniLink"
import { Button, ButtonProps } from "@material-ui/core"

type Props = ButtonProps & {
    to: string
    linkProps?: Omit<AniLinkProps, "to">
}

const LinkButton = ({
    to,
    linkProps = {
        swipe: true,
        direction: "left",
    },
    children,
    ...rest
}: Props) => (
    <AniLink to={to} {...linkProps} style={{ textDecoration: "none" }}>
        <Button {...rest}>{children}</Button>
    </AniLink>
)

export default LinkButton
