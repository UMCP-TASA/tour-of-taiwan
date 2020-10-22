import React from "react"
import { PageProps, navigate } from "gatsby"
import firebase from "gatsby-plugin-firebase"
import { StyledFirebaseAuth } from "react-firebaseui"
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Card,
    CardContent,
    CardHeader,
    Container,
    Grid,
    Typography,
    makeStyles,
} from "@material-ui/core"
import { ExpandMore } from "@material-ui/icons"

import SEO from "components/seo"
import useIsSignedIn from "hooks/useIsSignedIn"

type FAQuestionProps = {
    id: string
    question: string
    answer?: string
    children?: React.ReactNode
}

const FAQuestion = ({ id, question, answer, children }: FAQuestionProps) => (
    <Accordion>
        <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls={`${id}-controls`}
            id={`${id}-header`}
        >
            <Typography variant="h6">{question}</Typography>
        </AccordionSummary>
        <AccordionDetails style={{ textAlign: "left" }}>
            {answer && <Typography>{answer}</Typography>}
            {children}
        </AccordionDetails>
    </Accordion>
)

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4),
        height: "100%",
    },
    grid: {
        height: "100%",
    },
}))

const SignInPage = ({}: PageProps) => {
    const classes = useStyles()
    const isSignedIn = useIsSignedIn()

    if (isSignedIn) {
        // Already signed in so no need to sign in
        navigate("/profile")
        return <></>
    }

    return (
        <>
            <SEO title="Sign In" />
            <Container maxWidth="md" className={classes.root}>
                <Grid
                    container
                    className={classes.grid}
                    alignItems="center"
                    direction="column"
                    justify="space-between"
                >
                    <Grid item>
                        <Typography variant="h3" align="center">
                            Sign In
                        </Typography>
                    </Grid>
                    <Grid item>
                        <StyledFirebaseAuth
                            firebaseAuth={firebase.auth()}
                            uiConfig={{
                                signInFlow: "popup",
                                signInOptions: [
                                    firebase.auth.GoogleAuthProvider
                                        .PROVIDER_ID,
                                    {
                                        provider:
                                            firebase.auth.EmailAuthProvider
                                                .PROVIDER_ID,
                                        requireDisplayName: true,
                                    },
                                ],
                                callbacks: {
                                    signInSuccessWithAuthResult: () => false,
                                },
                            }}
                        />
                    </Grid>

                    <Grid item>
                        <Card>
                            <CardHeader
                                title="FAQ"
                                titleTypographyProps={{ align: "center" }}
                            />

                            <FAQuestion
                                id="faq-question-sign-up"
                                question="How do I sign up?"
                                answer="If you sign in with an email that doesn't yet have an
                                account associated with it, an account will be generated
                                for you"
                            />

                            <FAQuestion
                                id="faq-question-benefits"
                                question="Why should I sign up?"
                                answer="Most of the site is accessible without an account! 
                            Signing up allows you to buy and keep track of your raffle tickets. 
                            You get one free raffle ticket for signing up!"
                            />
                            <FAQuestion
                                id="faq-question-trust"
                                question="Why should I trust you?"
                            >
                                <Typography component="div">
                                    Depends on if you trust:
                                    <ul>
                                        <li>
                                            <a href="https://umcptasa.com">
                                                UMCP TASA
                                            </a>
                                            , the organization that created this
                                            application
                                        </li>
                                        <li>
                                            Google's Firebase which is used as
                                            our authentication server and
                                            database
                                        </li>
                                    </ul>
                                </Typography>
                            </FAQuestion>

                            <FAQuestion
                                id="faq-question-data"
                                question="What data do you store?"
                            >
                                <Typography>
                                    We use Google's Firebase authenticate and
                                    store user information. The only two pieces
                                    of identifiable information we store are
                                    your email address and display name. You
                                    either provide us with a display name when
                                    creating an account through email or
                                    Firebase grabs it from whatever service you
                                    signed in with. When you
                                </Typography>
                            </FAQuestion>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}
export default SignInPage
