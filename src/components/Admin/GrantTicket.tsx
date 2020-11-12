import React from "react"
import firebase from "gatsby-plugin-firebase"
import { Grid, TextField, MenuItem } from "@material-ui/core"

import { SubmitButton } from "components/Buttons"

type Props = {}

const categories = ["Basic", "Premium"]

const GrantTicket = ({}: Props) => {
    const [person, setPerson] = React.useState("")
    const [category, setCategory] = React.useState(categories[0])
    const [amount, setAmount] = React.useState(1)

    const handleClick = async () => {
        const grantTicket = firebase
            .app()
            .functions("us-east4")
            .httpsCallable("grantTicket")

        const response = await grantTicket({ person, category, amount })

        return {
            message: response.data.message,
            ...response.data,
        }
    }

    return (
        <Grid container justify="center" spacing={1}>
            <Grid item>
                <TextField
                    id={"grant-ticket-category"}
                    onChange={event => setCategory(event.target.value)}
                    select
                    value={category}
                    label="Category"
                    variant="outlined"
                    fullWidth
                >
                    {categories.map(value => (
                        <MenuItem key={value} value={value}>
                            {value}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>
            <Grid item>
                <TextField
                    id={"grant-ticket-amount"}
                    onChange={event => setAmount(Number(event.target.value))}
                    select
                    type="number"
                    label="Amount"
                    variant="outlined"
                    fullWidth
                />
            </Grid>
            <Grid item>
                <TextField
                    id={"grant-ticket-person"}
                    onChange={event => setPerson(event.target.value)}
                    label="Email"
                    helperText="Enter email of person who gets this ticket"
                    variant="outlined"
                    fullWidth
                />
            </Grid>
            <Grid item xs={4}>
                <SubmitButton
                    initialText="Grant Ticket"
                    handleClick={handleClick}
                    fullWidth
                    size="large"
                    color="primary"
                    variant="contained"
                />
            </Grid>
        </Grid>
    )
}

export default GrantTicket
