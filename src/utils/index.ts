export const isBrowser = () => typeof window !== "undefined"

export function getEmbedUrl(url: string) {
    const reg = /(?:http?s?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/g
    const match = reg.exec(url)
    if (match != null) {
        return "https://www.youtube.com/embed/" + match[1]
    }
    return "https://www.youtube.com/embed/A9fdHs1uxGo" //random taiwan vid that should never show up
}