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

    function getEmbedUrl(url: string) {
        var reg = /(?:http?s?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/g;
        var match = reg.exec(url);
        if (match != null) {
            return 'http://www.youtube.com/embed/' + match[1];
        }
        return 'https://www.youtube.com/embed/A9fdHs1uxGo' //random taiwan vid that should never show up
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
                <iframe
                    src={getEmbedUrl(city.frontmatter.video)}
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    frameBorder="0"
                    allowFullScreen
                    width="100%" 
                    height="100%"
                />
            </ListItem>
            <Divider/>
        </List>
    )
}
