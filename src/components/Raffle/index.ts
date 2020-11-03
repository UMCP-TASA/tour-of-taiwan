export { default as RaffleCard } from "./RaffleCard"
export { default as RaffleTicket } from "./RaffleTicket"
export { default as StripeItemCard } from "./StripeItemCard"
export { default as PremiumTickets} from "./PremiumTickets"

export type DocType = firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>
export type CollectionQuery = {
    docs: DocType[] | undefined,
    loading: boolean,
    error?: Error, 
}