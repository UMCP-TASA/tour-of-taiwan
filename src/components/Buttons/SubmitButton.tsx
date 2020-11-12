import React, { useState, useEffect, ReactNode } from "react"
import {
    Button,
    ButtonProps,
    CircularProgress,
    CircularProgressProps,
    Typography,
    TypographyProps,
} from "@material-ui/core"

interface Response {
    message: string
}

type SubmitFunction<T extends Response> = () => Promise<T>

type Props<T extends Response> = ButtonProps & {
    initialText: string
    handleClick: SubmitFunction<T>,
    setResponse?: (response: T) => void,
    progressProps?: CircularProgressProps
    typographyProps?: TypographyProps
}

const SubmitButton = <T extends Response,>({
    initialText,
    handleClick,
    setResponse,
    progressProps,
    typographyProps,
    onClick,
    ...rest
}: Props<T>) => {
    const [disabled, setDisabled] = useState(false)
    const [buttonText, setButtonText] = useState<ReactNode>(initialText)
    const [errorMessage, setErrorMessage] = useState("")

    useEffect(() => setButtonText(initialText), [initialText])

    const handleSubmit = async () => {
        setErrorMessage("")
        setDisabled(true)
        setButtonText(<CircularProgress {...progressProps} />)

        const response = await handleClick()

        if(setResponse) setResponse(response)

        setErrorMessage(response.message)
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
