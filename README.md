# UMCP TASA Tour of Taiwan 2020

Our application for our Tour of Taiwan event. Utilizes Gatsby, React, Netlify, and Firebase

# Table of Contents

1. [Installation](#installation)
    1. [Gatsby](#gatsby)
    2. [Environment Variables](#environment-variables)
    3. [Typescript](#typescript)
2. [File Structure](#file-structure)
3. [Customizing Theme and Styling](#customizing-theme-and-styling)
4. [Page Transitions](#page-transitions)
5. [Firebase](#firebase)
6. [Animations](#animations)
7. [Netlify](#netlify)

# Installation

Everything is already set-up in the [package.json](package.json) so all you have to do is

```
npm install
```

Note that because of [this issue](https://github.com/pmndrs/react-spring/issues/1078) with react-spring, we currently have to manually patch the react-spring packages. Luckily with the use of the `patch-packages` package, this has already been done for you via the `postinstall` command.

## Gatsby

You will have to install gatsby-cli which you can do with `npm install -g gatsby-cli`
Their website has a nice [tutorial](https://www.gatsbyjs.org/tutorial/) which I recommend following.

You also can find the original [Gatsby's original README.md here](https://github.com/gatsbyjs/gatsby-starter-hello-world). That doc details a quick look at some file structure and basic files for this repo

## Environment Variables

In order for the [gatsby-plugin-firebase](https://www.gatsbyjs.com/plugins/gatsby-plugin-firebase/?=firebase) plugin to work properly, you'll have to create a `.env` file and add our credentials there. Copy the contents of the [.env.example](.env.example) file into the new `.env` file. To get our credentials:

1. Go to the [Firebase console](https://console.firebase.google.com/)
2. Sign into the UMCP TASA email
3. Click on Tour of Taiwan
4. Under the title, click the button that says `</> Tour of Taiwan Web`
5. Click the gear icon
6. Scroll down to "Your Apps"
7. Copy the information in the code highlight under firebase config to your .env file
    1. Names of the keys should correspond to the variable in the .env file

Tbh I don't know if we actually had to store these in an environment variable, since it doesn't look like these are secret keys. But this is a way to prevent anyone on the Internet from accessing our config information.

## Typescript

Types are cool. I hope I can convert you to Typescript (or Flow) too. Here are some resources for Typescript and Typescript with React

-   https://github.com/typescript-cheatsheets/react
-   https://ts.chibicode.com/todo/
-   https://2ality.com/2018/04/type-notation-typescript.html

# File Structure

-   [src/components](src/components): Holds all of the components for our site. Each sub-folder has an `index.ts` file that re-exports components so we can have a nice `import {} from "components/.."`
-   [src/hooks](src/hooks): Holds the custom hooks for our project. Take a look at [React's documentation for hooks](https://reactjs.org/docs/hooks-intro.html) for a nice introduction to hooks
-   [src/assets](src/assets): Our assets folder that'll contain any images, videos, or json files we end up using
-   [src/pages](src/pages): Each file in this folder correspond to a page on the site. The path for the page matches the filename
-   [src/types](src/types): Our custom Typescript types

# Customizing Theme and Styling

This site uses [Material-UI](https://material-ui.com/) components for styling. The theme can be modified in [`theme.tsx`](/src/App/theme.tsx) to change the primary and secondary colors, the spacing used throughout the site, and typography. More info about customizing theme can be found on the [official Material-UI cutomization guide](https://material-ui.com/customization/theming/). The theme is provided to all the pages in [`gatsby-browser.js`](gatsby-browser.js) via the [ThemeProvider](/src/App/App.tsx) component.

The Material-UI framework relies on the idea of [css-in-js](https://css-tricks.com/bridging-the-gap-between-css-and-javascript-css-in-js/). In particular, we use Material-UI's [Hook API](https://material-ui.com/styles/basics/) method of adding styles.

We can add styles to components by defining CSS in the `styles` object. There's a slight difference in naming between usual CSS fields and CSS-in-JS fields, but that's usually replacing '-' with camelCase. We can also use media queries to use different styles depending on the size of the screen!

All h1, h2, h3, etc elements can be customized across the site in themes as well. Here's the example from the [Material-UI documentation](https://material-ui.com/customization/typography/)

```javascript
const theme = createMuiTheme({
    typography: {
        subtitle1: {
            fontSize: 12,
        },
        body1: {
            fontWeight: 500,
        },
        button: {
            fontStyle: "italic",
        },
    },
})
```

# Page Transitions

Smooth page transitions make everything look polished. We'll be using [gatsby-plugin-transition-link](https://transitionlink.tylerbarnes.ca/docs/transitionlink/) to handle the transitions. I'm still not entirely sure how this works, so if anyone has a better solution please let me know! Right now, our footer and header components use AniLink, the plugin's default transition component, to create a swipe like effect like how apps transition between pages.

I had to add a custom ".d.ts" file in [src/types](src/types) in order to add types to this plugin. I followed this [Medium article](https://medium.com/@chris_72272/migrating-to-typescript-write-a-declaration-file-for-a-third-party-npm-module-b1f75808ed2) to create a declarations file.

# Firebase

We utilize [gatsby-plugin-firebase](https://www.gatsbyjs.com/plugins/gatsby-plugin-firebase/?=firebase) to handle importing and utilizing our firebase instance. Due to how Gatsby uses server side rendering to pre-render some of the sites, we have to have a different way of using firebase. The [gatsby-plugin-firebase](https://www.gatsbyjs.com/plugins/gatsby-plugin-firebase/?=firebase) plugin handles all of that for us.

We then use [react-firebase-hooks](https://github.com/CSFrequency/react-firebase-hooks/tree/master/firestore) for that sweet hook abstraction on querying our Cloud Firestore.

Our Firebase Function that we use to auto-generate tickets when an account is created and to create tickets is located in our private repo tour-of-taiwan-admin

# Animations

This site use [react-spring](https://www.react-spring.io/) for animations. In order to fix some issues with typing, I upgraded to the 9.0.0-rc.3 version of react-spring. This means that some of the docs on the main page are outdated. Instead, refer to the [react-spring v9 docs](https://aleclarson.github.io/react-spring/v9/).

# Netlify
We're using Netlify to host our site! You can access our control panel by signing into [app.netlify.com]([app.netlify.com]) with our UMCP TASA email. All of the environment variables are set up already.