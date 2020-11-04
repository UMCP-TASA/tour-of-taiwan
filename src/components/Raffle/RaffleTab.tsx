import React from "react"

type Props = {
    children: React.ReactNode
    index: number
    value: number
}

const RaffleTab = ({ children, index, value }: Props) => (
    <div
        role="tabpanel"
        hidden={value !== index}
        id={`raffle-tab-panel-${index}`}
        aria-labelledby={`raffle-tab-${index}`}
    >
        {children}
    </div>
)

export default RaffleTab
