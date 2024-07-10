import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import axios from "axios"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { showToast } from "../utils/toast"

const StripePayment = ({ paymentIntentData }) => {
    const { id } = useParams()
    const [isLoading, setIsLoading] = useState(false)
    const stripe = useStripe()
    const elements = useElements()

    const handleMakePayment = async (e) => {
        e.preventDefault()
        if (!stripe || !elements) {
            return
        }
        try {
            setIsLoading(true)
            const result = await stripe.confirmCardPayment(
                paymentIntentData?.clientSecret,
                {
                    payment_method: {
                        card: elements.getElement(CardElement),
                    },
                }
            )

            if (result?.paymentIntent?.status === "succeeded") {
                const res = await axios.put(
                    `${
                        import.meta.env.VITE_SERVER_URL
                    }/api/v1/order/payment/${id}`,
                    { paymentIntentId: paymentIntentData?.paymentIntentId },
                    { withCredentials: true }
                )

                if (res?.data?.success) {
                    setIsLoading(false)
                    showToast(res?.data?.message, "success")
                    window.location.reload()
                }
            } else {
                setIsLoading(false)
            }
        } catch (error) {
            console.log(error)
            setIsLoading(false)
            showToast("something went wrong...", "error")
        }
    }

    return (
        <div className='flex flex-col gap-3'>
            <h3 className='text-xl font-semibold'>Payment Details</h3>
            <CardElement
                id='payment-element'
                className='border rounded-md p-2 text-sm'
            />
            <div className=''>
                <button
                    type='button'
                    className='text-white bg-black w-full border rounded-md text-center p-2 hover:bg-white hover:text-black hover:border-black transition ease-in-out delay-150'
                    disabled={isLoading}
                    onClick={handleMakePayment}
                >
                    {isLoading ? "Please Wait..." : "Make Payment"}
                </button>
            </div>
        </div>
    )
}

export default StripePayment
