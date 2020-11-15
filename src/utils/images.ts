import { graphql } from "gatsby"
import { ImageWithPathFragment } from "graphql-types"

export const imageWithPath = graphql`
    fragment ImageWithPath on File {
        absolutePath
    }
`

export function connectWithImage<T>(nodes: T[], images: ImageWithPathFragment[]) {

}