import { graphql } from "gatsby"
import { ImageWithPathFragment, MarkdownImgPathFragment } from "graphql-types"

export const pathFragments = graphql`
    fragment ImageWithPath on File {
        absolutePath
    }
    fragment MarkdownImgPath on MarkdownRemark {
        frontmatter {
            imgsrc
        }
    }
`
export function connectWithImage<T extends MarkdownImgPathFragment>(
    nodes: (T | null | undefined)[],
    images: ImageWithPathFragment[]
) {
    
}
