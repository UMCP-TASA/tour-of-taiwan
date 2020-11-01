import React from "react"
import { PageProps, graphql } from "gatsby"
import { CitiesPageQuery } from "graphql-types"

const CitiesPage = ({ data }: PageProps<CitiesPageQuery>) => <>City Page</>

export default CitiesPage

export const query = graphql`
    query CitiesPage {
        cities: allMarkdownRemark(
            filter: { frontmatter: { category: { eq: "city" } } }
        ) {
            nodes {
                id
                frontmatter {
                    name
                    imgsrc
                    video
                }
                html
            }
        }
    }
`
