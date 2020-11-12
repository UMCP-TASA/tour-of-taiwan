import React, { useState, useEffect, ReactNode } from "react"
import {
    Button,
    ButtonProps,
    CircularProgress,
    CircularProgressProps,
    Typography,
    TypographyProps,
} from "@material-ui/core"

type SubmitFunction = () => Promise<string>

type Props = ButtonProps & {
    initialText: string
    handleClick: SubmitFunction
    progressProps?: CircularProgressProps
    typographyProps?: TypographyProps
}

const SubmitButton = ({
    initialText,
    handleClick,
    progressProps,
    typographyProps,
    onClick,
    ...rest
}: Props) => {
    const [disabled, setDisabled] = useState(false)
    const [buttonText, setButtonText] = useState<ReactNode>(initialText)
    const [errorMessage, setErrorMessage] = useState("")

    useEffect(() => setButtonText(initialText), [initialText])

    const handleSubmit = async () => {
        setErrorMessage("")
        setDisabled(true)
        setButtonText(<CircularProgress {...progressProps} />)

        const errorMessage = await handleClick()

        setErrorMessage(errorMessage)
        setDisabled(false)
        setButtonText(initialText)
    }
    return (
        <>
            {errorMessage !== "" && (
                <Typography align="center" {...typographyProps}>
                    {errorMessage}
                </Typography>
            )}
            <Button
                {...rest}
                onClick={onClick ? onClick : handleSubmit}
                disabled={disabled}
            >
                {buttonText}
            </Button>
        </>
    )
}

export default SubmitButton
