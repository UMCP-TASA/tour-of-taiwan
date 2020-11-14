<<<<<<< HEAD
import React from "react"
import { PageProps } from "gatsby"
import ReactGlobe from "react-globe"
import { Typography } from "@material-ui/core"
import { TransitionPageProps } from "gatsby-plugin-transition-link"

import SEO from "components/seo"
import ClientOnly from "components/ClientOnly"

const IndexPage = ({transitionStatus}: PageProps & TransitionPageProps) => {
    console.log(transitionStatus)
    return (
        <>
            <SEO title="Home" />
            <Typography variant="h1" align="center">
                Tour of Taiwan
            </Typography>

            {/* Because ReactGlobe can't be rendered on the server, we have this to hide it. See the README for more*/}
            {typeof window === undefined ? (
                <div style={{ height: "50vh" }} />
            ) : (
                <ReactGlobe height="50vh" globeBackgroundTexture={null} />
            )}
        </>
    )
}

export default IndexPage
=======
import React from "react"
import { makeStyles } from "@material-ui/core"
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { animated, useSpring, config } from "react-spring";

import SEO from "components/seo"
import ClientOnly from "components/ClientOnly"
import { LinkButton } from "components/Buttons"
import useBoop from "hooks/useBoop"

const useStyles = makeStyles(theme => ({
    container: {
        backgroundImage: 'url(/assets/home/sky.svg)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        height: '100vh',
        width: '100%',
        position: 'absolute',
        top: '0',
        textAlign: 'center',
        overflow: 'hidden'
    },
    logoA: {
        width: '350px',
        zIndex: (3),
        [theme.breakpoints.down("xs")]: {
            width: '60%',
        },
    },
    logoB: {
        width: '500px',
        marginTop: '30px',
        zIndex: (3),
        [theme.breakpoints.down("xs")]: {
            width: '85%',
            marginTop: '20px'
        },
    },
    tp101: {
        height: '85vh', 
        zIndex: (2),
        position: 'absolute',
        left: '10%',
        [theme.breakpoints.down("md")]: {
            left: '5%',
            maxHeight: '80vw'
        },
        [theme.breakpoints.down("sm")]: {
            left: '2%',
        },
        [theme.breakpoints.down("xs")]: {
            left: '15%',
        },
    },
    mountain: {
        width: '100%',
        position: 'absolute',
    },
    building: {
        width: '33%',
        zIndex: (2),
        position: 'absolute',
        right: '2%',
        [theme.breakpoints.down("sm")]: {
            width: '55%',
            right: '5%',
            bottom: '5%',
        },
    },
    button: {
        background: 'pink !important',
        fontWeight: 'bold',
        fontSize: '20px',
        marginTop: '4%',
        zIndex: (3),
        [theme.breakpoints.down("xs")]: {
            fontSize: '15px',
            marginTop: '10%',
        },
    }
}))

const IndexPage = () => {
    const classes = useStyles()

    const logoBProps = useSpring({
        to: {opacity: 1},
        from: {opacity: 0},
        delay: 1500,
        config: config.slow
    })

    const logoAProps = useSpring({
        to: {opacity: 1, marginTop: '25vh'},
        from: {opacity: .5, marginTop: '-10vh'},
        delay: 600,
    })

    const mountainProps = useSpring({
        to: {bottom: -10},
        from: {bottom: -60},
        config: config.slow
    })

    const tp101Props = useSpring({
        to: {bottom: '-1%'},
        from: {bottom: '-100%'},
        delay: 500,
    })

    const matches = useMediaQuery('(max-width:960px)');
    const buildingProps = useSpring({
        to: {bottom: matches ? '5%' : '-1%'},
        from: {bottom: '-100%'},
        delay: 500,
    })

    const buttonProps = useSpring({
        to: {opacity: 1},
        from: {opacity: 0},
        delay: 2000,
        config: config.slow
    })
    const [buttonBoop, trigger] = useBoop({ scale: 1.05 });

    return (
        <>
            <SEO title="Home" />
            <div className={classes.container}>
                <animated.div style={mountainProps} className={classes.mountain}><img src={`/assets/home/mountain.svg`} style={{minHeight: '450px', objectFit: 'cover'}}/></animated.div>
                <animated.div style={tp101Props} className={classes.tp101}><img src={`/assets/home/tp101.svg`} style={{height: '100%'}}/></animated.div>
                <animated.div style={buildingProps} className={classes.building}><img src={`/assets/home/building.svg`} style={{width: '100%'}}/></animated.div>
                <animated.div style={logoAProps}><img src={`/assets/home/logo-a.svg`} className={classes.logoA}/></animated.div>
                <animated.div style={logoBProps}><img src={`/assets/home/logo-b.svg`} className={classes.logoB}/></animated.div>
                <animated.div style={{...buttonProps, ...buttonBoop}}><LinkButton to='/cities' className={classes.button} onMouseEnter={trigger}>Begin Tour</LinkButton></animated.div>
            </div>
        </>
    )
}

export default IndexPage
>>>>>>> main
