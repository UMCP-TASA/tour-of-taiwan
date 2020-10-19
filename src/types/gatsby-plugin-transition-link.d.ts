import { GatsbyLinkProps } from "gatsby"

declare module "gatsby-plugin-transition-link/AniLink" {
    interface AniLinkProps extends GatsbyLinkProps {
        duration?: number

        fade?: boolean
        paintDrip?: boolean
        swipe?: boolean
        cover?: boolean

        direction?: "up" | "down" | "left" | "right"
        top?: "exit" | "entry"

        entryOffset?: number
        color?: string
        hex?: string

        bg?: React.CSSProperties["background"]
    }

    const AniLink: React.FC<AniLinkProps>

    export default AniLink
}
