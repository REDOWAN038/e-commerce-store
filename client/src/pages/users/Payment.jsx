import axios from "axios"
import moment from "moment"
import { Elements } from "@stripe/react-stripe-js"
import { showToast } from "../../utils/toast"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectStripePromise, selectUser } from "../../features/auth/selector"
import CheckoutSummary from "../../components/CheckoutSummary"
import StripePayment from "../../components/StripePayment"
import Timeline from "../../components/Timeline"

const Payment = () => {
    const { id } = useParams()
    const user = useSelector(selectUser)
    const stripePromise = useSelector(selectStripePromise)
    const [orderDetails, setOrderDetails] = useState()
    const [paymentIntentData, setPaymentIntentData] = useState(null)

    const handleGetOrderDetails = async () => {
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_SERVER_URL}/api/v1/order/${id}`,
                { withCredentials: true }
            )

            if (res?.data?.success) {
                setOrderDetails(res?.data?.payload?.order)
            }
        } catch (error) {
            showToast("something went wrong", "error")
            console.log(error)
        }
    }

    const getPaymentIntent = async () => {
        try {
            const res = await axios.get(
                `${
                    import.meta.env.VITE_SERVER_URL
                }/api/v1/order/payment-intent/${id}`,
                { withCredentials: true }
            )

            if (res?.data?.success) {
                setPaymentIntentData(res?.data?.payload)
            }
        } catch (error) {
            showToast(error?.response?.data?.message, "error")
        }
    }

    const handleDeliverProduct = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.put(
                `${
                    import.meta.env.VITE_SERVER_URL
                }/api/v1/admin/order/deliver/${id}`,
                {},
                { withCredentials: true }
            )
            if (res?.data?.success) {
                showToast("Order is Delivered", "success")
                window.location.reload()
            }
        } catch (error) {
            if (
                error?.response?.status === 404 ||
                error?.response?.status === 406
            ) {
                showToast(error?.response?.data?.message, "error")
            } else {
                showToast("something went wrong...", "error")
            }
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                await handleGetOrderDetails()
                if (!user?.isAdmin) {
                    await getPaymentIntent()
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className='flex flex-col space-y-2 mt-10'>
            {!user?.isAdmin && (
                <div className='flex mx-auto'>
                    <Timeline
                        class1='bg-primary'
                        fill1='currentColor'
                        class2='bg-primary'
                        fill2='currentColor'
                    />
                </div>
            )}
            <div className='flex flex-col justify-center gap-8 mt-10 w-11/12 md:w-9/12 lg:w-7/12 mx-auto'>
                <div className='w-full'>
                    {/* product details */}
                    <div className='flex flex-col bg-white shadow-lg w-full gap-6 px-10 py-5 h-fit rounded-lg'>
                        {orderDetails?.orderItems?.length === 0 ? (
                            <h2>Order is empty</h2>
                        ) : (
                            <div className='overflow-x-auto'>
                                <table className='w-full'>
                                    <thead className='border-b-2'>
                                        <tr>
                                            <th className='p-2 text-center whitespace-nowrap'>
                                                Image
                                            </th>
                                            <th className='p-2 text-center whitespace-nowrap'>
                                                Product
                                            </th>
                                            <th className='p-2 text-center whitespace-nowrap'>
                                                Quantity
                                            </th>
                                            <th className='p-2 text-center whitespace-nowrap'>
                                                Unit Price
                                            </th>
                                            <th className='p-2 text-center whitespace-nowrap'>
                                                Total
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {orderDetails?.orderItems?.map(
                                            (item, index) => (
                                                <tr key={index}>
                                                    <td className='p-2 flex justify-center'>
                                                        <img
                                                            src={item.images[0]}
                                                            alt={item.name}
                                                            className='w-16 h-16 object-cover'
                                                        />
                                                    </td>

                                                    <td className='p-2 text-center whitespace-nowrap'>
                                                        {item.name}
                                                    </td>

                                                    <td className='p-2 text-center whitespace-nowrap'>
                                                        {item.orderQuantity}
                                                    </td>
                                                    <td className='p-2 text-center whitespace-nowrap'>
                                                        {item.price}
                                                    </td>
                                                    <td className='p-2 text-center whitespace-nowrap'>
                                                        ${" "}
                                                        {(
                                                            item.orderQuantity *
                                                            item.price
                                                        ).toFixed(2)}
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>

                <div className='flex flex-col justify-between gap-8 lg:flex-row w-full'>
                    {/* shipping address */}
                    <div className='flex flex-col space-y-4 bg-white shadow-lg w-full lg:w-[395px] h-fit px-10 py-5 rounded-lg'>
                        <div className=''>
                            <h2 className='text-xl font-bold mb-2'>
                                Shipping Details
                            </h2>
                            <p className='mb-4 mt-4 flex gap-3 items-center'>
                                <strong className='text-pink-500'>
                                    Order :
                                </strong>{" "}
                                {orderDetails?._id}
                            </p>

                            <p className='mb-4 flex gap-3 items-center'>
                                <strong className='text-pink-500'>Name:</strong>{" "}
                                {orderDetails?.user?.name}
                            </p>

                            <p className='mb-4 flex gap-3 items-center'>
                                <strong className='text-pink-500'>
                                    Email:
                                </strong>{" "}
                                {orderDetails?.user?.email}
                            </p>

                            <p className='mb-4 flex gap-3 items-center'>
                                <strong className='text-pink-500'>
                                    Phone:
                                </strong>{" "}
                                {orderDetails?.phone}
                            </p>

                            <p className='mb-4 flex gap-3'>
                                <strong className='text-pink-500'>
                                    Address:
                                </strong>{" "}
                                {orderDetails?.shippingAddress?.address},{" "}
                                {orderDetails?.shippingAddress?.district},{" "}
                                {orderDetails?.shippingAddress?.division},{" "}
                                {orderDetails?.shippingAddress?.country}
                            </p>
                        </div>
                    </div>
                    {/* checkout */}
                    <div className='flex flex-col space-y-4 bg-white shadow-lg w-full lg:w-[395px] h-fit px-10 py-5 rounded-lg'>
                        <h1 className='card-title border-b-2 pb-4'>
                            Checkout Summary
                        </h1>
                        <CheckoutSummary
                            itemsPrice={orderDetails?.itemsPrice}
                            taxPrice={orderDetails?.taxPrice}
                            shippingPrice={orderDetails?.shippingPrice}
                            totalPrice={orderDetails?.totalPrice}
                        />

                        {/* not admin */}
                        {!user.isAdmin ? (
                            <div>
                                {orderDetails?.isPaid ? (
                                    <h1 className='text-white bg-black w-full border rounded-md text-center p-2 mt-4'>
                                        Paid on{" "}
                                        {moment(orderDetails?.paidAt).format(
                                            "Do MMMM YYYY"
                                        )}
                                    </h1>
                                ) : (
                                    <div>
                                        <Elements
                                            stripe={stripePromise}
                                            options={{
                                                clientSecret:
                                                    paymentIntentData?.clientSecret,
                                            }}
                                        >
                                            <StripePayment
                                                paymentIntentData={
                                                    paymentIntentData
                                                }
                                            />
                                        </Elements>
                                    </div>
                                )}

                                {orderDetails?.isDelivered ? (
                                    <h1 className='text-white bg-black w-full border rounded-md text-center p-2 mt-4'>
                                        Delivered on{" "}
                                        {moment(
                                            orderDetails?.deliveredAt
                                        ).format("Do MMMM YYYY")}
                                    </h1>
                                ) : null}
                            </div>
                        ) : null}

                        {/* admin */}
                        {user.isAdmin ? (
                            <div>
                                {orderDetails?.isPaid ? (
                                    <h1 className='text-white bg-black w-full border rounded-md text-center p-2 mt-4'>
                                        Paid on{" "}
                                        {moment(orderDetails?.paidAt).format(
                                            "Do MMMM YYYY"
                                        )}
                                    </h1>
                                ) : (
                                    <h1 className='text-white bg-black w-full border rounded-md text-center p-2 mt-4'>
                                        Payment Pending
                                    </h1>
                                )}

                                {orderDetails?.isDelivered ? (
                                    <h1 className='text-white bg-black w-full border rounded-md text-center p-2 mt-4'>
                                        Delivered on{" "}
                                        {moment(
                                            orderDetails?.deliveredAt
                                        ).format("Do MMMM YYYY")}
                                    </h1>
                                ) : (
                                    <button
                                        type='button'
                                        className='text-white bg-black w-full border rounded-md text-center p-2 hover:bg-white hover:text-black hover:border-black transition ease-in-out delay-150 mt-4'
                                        onClick={handleDeliverProduct}
                                    >
                                        Mark As Delivered
                                    </button>
                                )}
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment
