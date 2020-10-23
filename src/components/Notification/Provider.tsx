import React from "react"
import { Notification, NotificationProps } from "."

type Options = Omit<NotificationProps, "open" | "handleClose">

export type NotificationContextType = {
    notification: JSX.Element
    setNotification: (options: Options) => void
}

export const NotificationContext = React.createContext<NotificationContextType>(
    {
        notification: <></>,
        setNotification: __ => {},
    }
)

type Props = {
    children: React.ReactNode
}

// Currently only one notification can be shown at a time so oops
const Provider = ({ children }: Props) => {
    const [rawNotification, setRawNotification] = React.useState(<></>)
    const [open, setOpen] = React.useState(false)
    const [props, setProps] = React.useState<Options>({
        // open: open,
        // handleClose: () => setOpen(false),
        message: "",
        severity: "info",
    })

    const contextValue = React.useMemo(() => {
        console.log("Context being set")
        function setNotification(options: Options) {
            // setRawNotification(
            //     <Notification
            //         open={open}
            //         handleClose={() => setOpen(false)}
            //         {...options}
            //     />
            // )
            setProps({
                ...props,
                ...options,
            })
            setOpen(true)
        }

        return {
            notification: rawNotification,
            setNotification,
        }
    }, [setProps, setOpen])

    console.log(props)

    return (
        <NotificationContext.Provider value={contextValue}>
            {children}
            <div id="notif">
                <Notification open={open} handleClose={() => setOpen(false)} {...props} />
            </div>
        </NotificationContext.Provider>
    )
}

export default Provider
