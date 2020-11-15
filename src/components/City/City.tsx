import React from "react"
import { CityFragment } from "graphql-types"

type Props = {
    city: CityFragment | null | undefined
}

export default function City({ city }: Props) {
    if (!city) {
        throw new Error("City does not exist")
    }

    if (!city.frontmatter) {
        throw new Error("Frontmatter does not exist")
    }

    if (!city.frontmatter.imgsrc) {
        throw new Error("Frontmatter does not exist")
    }

    if (!city.frontmatter.video) {
        throw new Error("Frontmatter does not exist")
    }

    function getEmbedUrl(url: string) {
        var reg = /(?:http?s?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/g
        var match = reg.exec(url)
        if (match != null) {
            return "https://www.youtube.com/embed/" + match[1]
        }
        return "https://www.youtube.com/embed/A9fdHs1uxGo" //random taiwan vid that should never show up
    }

    return (
        <div
            style={{
                position: "relative",
                margin: "0px 20px",
                marginTop: "5%",
                boxShadow: "rgba(0, 0, 0, .2) 0px 0px 5px 2px",
                padding: "5px",
                backgroundColor: "rgba(0,0,0,.1)",
                borderRadius: "7px",
            }}
        >
            <img
                src={city.frontmatter.imgsrc}
                style={{
                    borderRadius: "7px",
                    width: "100%",
                    height: "30vh",
                    objectFit: "cover",
                }}
            />
            <h1
                style={{
                    position: "absolute",
                    top: "15vh",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    background: "rgba(255,255,255,.9)",
                    borderRadius: "7px",
                    padding: "0px 5px",
                }}
            >
                {city.frontmatter.name}
            </h1>
            <iframe
                src={getEmbedUrl(city.frontmatter.video)}
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                frameBorder="0"
                allowFullScreen
                style={{ borderRadius: "7px", width: "100%", height: "35vh" }}
            />
        </div>
    )
}
