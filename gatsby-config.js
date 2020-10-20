require("dotenv").config()

module.exports = {
    siteMetadata: {
        title: `Tour of Taiwan`,
        description: `UMCP TASA Tour of Taiwan 2020`,
        author: `UMCP TASA`,
    },
    plugins: [
        `gatsby-plugin-typescript`,
        `gatsby-plugin-react-helmet`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `assets`,
                path: `${__dirname}/src/assets`,
            },
        },
        {
            resolve: `gatsby-alias-imports`,
            options: {
                aliases: {
                    root: `/`,
                },
            },
        },
        {
            resolve: "gatsby-plugin-firebase",
            options: {
                credentials: {
                    apiKey: process.env.FIREBASE_API_KEY,
                    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
                    databaseURL: process.env.FIREBASE_DATABASE_URL,
                    projectId: process.env.FIREBASE_PROJECT_ID,
                    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
                    messagingSenderId: process.env.FIREBASE_MESSAGING_ID,
                    appId: process.env.FIREBASE_APP_ID,
                },
            },
        },
        `gatsby-plugin-material-ui`,
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        `gatsby-plugin-graphql-codegen`,
        {
            resolve: "gatsby-plugin-transition-link",
            options: {
                layout: require.resolve(`./src/components/App/App.tsx`),
            },
        },
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `Tour of Taiwan 2020`,
                short_name: `ToT`,
                start_url: `/`,
                background_color: `#663399`,
                theme_color: `#663399`,
                display: `minimal-ui`,
                icon: `src/assets/gatsby-icon.png`, // This path is relative to the root of the site.
            },
        },
        // this (optional) plugin enables Progressive Web App + Offline functionality
        // To learn more, visit: https://gatsby.dev/offline
        `gatsby-plugin-offline`,
    ],
}
