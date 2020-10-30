/**
 * Stripe requires us to load from their site,
 * so they provide a wrapper for us to use.
 *
 * This code uses a singleton to prevent having to re-initialize
 * stripe every time
 *
 * Code from: https://www.gatsbyjs.com/tutorial/ecommerce-tutorial/#loading-stripejs
 */

import { loadStripe, Stripe } from "@stripe/stripe-js"

const PUBLIC_KEY =
    "pk_test_51HgZMoI2gbJ3CgDUd3CAdpNV3gBitKroNg848YgaO56GpDR9v5ZaR8DxQTRujRZtVdmORwMOHFzShrCK6mEm1tDO00tpzNYAVr"

let stripePromise: Promise<Stripe | null>
export const getStripe = () => {
    if (!stripePromise) {
        stripePromise = loadStripe(PUBLIC_KEY)
    }
    return stripePromise
}
