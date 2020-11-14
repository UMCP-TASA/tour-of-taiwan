import React from "react"
import { CityFragment } from "graphql-types"
import { List, ListItem, Divider} from "@material-ui/core"

type Props = { 
    city: CityFragment | null | undefined
}

export default function City({city} : Props) {

    if (!city) {
        throw new Error("City does not exist")
    }

    if (!city.frontmatter) {
        throw new Error("Frontmatter does not exist");
    }

    if (!city.frontmatter.imgsrc) {
        throw new Error("Frontmatter does not exist");
    }

    if (!city.frontmatter.video) {
        throw new Error("Frontmatter does not exist");
    }
        
    return (
        <List> 
            <ListItem style={{display: "block"}}>
                <h1 style={{textAlign: "center"}}>
                    {city.frontmatter.name}
                </h1>
            </ListItem>
            <Divider/>
            <ListItem alignItems="flex-start">
                <img src={city.frontmatter.imgsrc} width="100%" height="100%"/>
            </ListItem>
            <Divider/>
            <ListItem>
                <iframe src={city.frontmatter.video} width="100%" height="100%"/>
            </ListItem>
            <Divider/>
        </List>
    )
}
