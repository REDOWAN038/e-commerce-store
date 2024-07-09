import axios from "axios"
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js"
import { showToast } from "../../utils/toast"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectUser } from "../../features/auth/selector"
import CheckoutSummary from "../../components/CheckoutSummary"

const Payment = () => {
    const { id } = useParams()
    const user = useSelector(selectUser)
    const [paypalClientId, setPaypalClientId] = useState("")
    const [orderDetails, setOrderDetails] = useState()

    const [{ isPending }, paypalDispatch] = usePayPalScriptReducer()

    const handleGetPaypalClientId = async () => {
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_SERVER_URL}/api/v1/config/paypal`
            )

            if (res?.data?.success) {
                setPaypalClientId(res?.data?.payload?.paypalClientId)
            }
        } catch (error) {
            showToast("something went wrong", "error")
            console.log(error)
        }
    }

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

    function onApprove(data, actions) {
        // return actions.order.capture().then(async function (details) {
        //     try {
        //         await payOrder({ orderId, details })
        //         refetch()
        //         toast.success("Order is paid")
        //     } catch (error) {
        //         toast.error(error?.data?.message || error.message)
        //     }
        // })
    }

    function createOrder(data, actions) {
        // return actions.order
        //     .create({
        //         purchase_units: [{ amount: { value: order.totalPrice } }],
        //     })
        //     .then((orderID) => {
        //         return orderID
        //     })
    }

    function onError(err) {
        // toast.error(err.message)
    }

    useEffect(() => {
        const loadingPaPalScript = async () => {
            paypalDispatch({
                type: "resetOptions",
                value: {
                    "client-id": paypalClientId,
                    currency: "USD",
                },
            })
            paypalDispatch({ type: "setLoadingStatus", value: "pending" })
        }

        if (orderDetails && !orderDetails.isPaid) {
            if (!window.paypal) {
                loadingPaPalScript()
            }
        }
    }, [paypalClientId, orderDetails, paypalDispatch])

    useEffect(() => {
        const fetchData = async () => {
            try {
                await handleGetOrderDetails()
                await handleGetPaypalClientId()
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className='flex flex-col gap-4 mt-10 lg:flex-row'>
            <div className='flex flex-col space-y-4 w-11/12 lg:w-7/12 mx-auto'>
                {/* product details */}
                <div className='flex flex-col bg-white shadow-sm w-full gap-6 px-10 py-5 h-fit'>
                    {orderDetails?.orderItems?.length === 0 ? (
                        <h2>Order is empty</h2>
                    ) : (
                        <div className='overflow-x-auto'>
                            <table className='w-full'>
                                <thead className='border-b-2'>
                                    <tr>
                                        <th className='p-2 text-center'>
                                            Image
                                        </th>
                                        <th className='p-2 text-center'>
                                            Product
                                        </th>
                                        <th className='p-2 text-center'>
                                            Quantity
                                        </th>
                                        <th className='p-2 text-center'>
                                            Unit Price
                                        </th>
                                        <th className='p-2 text-center'>
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

                                                <td className='p-2 text-center'>
                                                    {item.name}
                                                </td>

                                                <td className='p-2 text-center'>
                                                    {item.orderQuantity}
                                                </td>
                                                <td className='p-2 text-center'>
                                                    {item.price}
                                                </td>
                                                <td className='p-2 text-center'>
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
                {/* shipping address */}
                <div className='flex flex-col space-y-4 bg-white shadow-sm w-fit h-fit px-10 py-5'>
                    <div className=''>
                        <h2 className='text-xl font-bold mb-2'>
                            Shipping Details
                        </h2>
                        <p className='mb-4 mt-4 flex gap-3 items-center'>
                            <strong className='text-pink-500'>Order :</strong>{" "}
                            {orderDetails?._id}
                        </p>

                        <p className='mb-4 flex gap-3 items-center'>
                            <strong className='text-pink-500'>Name:</strong>{" "}
                            {orderDetails?.user?.name}
                        </p>

                        <p className='mb-4 flex gap-3 items-center'>
                            <strong className='text-pink-500'>Email:</strong>{" "}
                            {orderDetails?.user?.email}
                        </p>

                        <p className='mb-4 flex gap-3 items-center'>
                            <strong className='text-pink-500'>Address:</strong>{" "}
                            {orderDetails?.shippingAddress?.address},{" "}
                            {orderDetails?.shippingAddress?.district},{" "}
                            {orderDetails?.shippingAddress?.division},{" "}
                            {orderDetails?.shippingAddress?.country}
                        </p>

                        <p className='mb-4 flex gap-3 items-center'>
                            <strong className='text-pink-500'>Method:</strong>{" "}
                            {orderDetails?.paymentMethod}
                        </p>

                        {orderDetails?.isPaid ? (
                            <h1 className='text-white bg-black w-full border rounded-md text-center p-2'>
                                Paid on {orderDetails?.paidAt}
                            </h1>
                        ) : (
                            <h1 className='text-white bg-black w-full border rounded-md text-center p-2'>
                                Not paid
                            </h1>
                        )}
                    </div>

                    {/* {!order.isPaid && (
                    <div>
                        {loadingPay && <Loader />}{" "}
                        {isPending ? (
                            <Loader />
                        ) : (
                            <div>
                                <div>
                                    <PayPalButtons
                                        createOrder={createOrder}
                                        onApprove={onApprove}
                                        onError={onError}
                                    ></PayPalButtons>
                                </div>
                            </div>
                        )}
                    </div>
                )} */}

                    {/* {loadingDeliver && <Loader />} */}
                    {/* {userInfo &&
                    userInfo.isAdmin &&
                    order.isPaid &&
                    !order.isDelivered && (
                        <div>
                            <button
                                type='button'
                                className='bg-pink-500 text-white w-full py-2'
                                onClick={deliverHandler}
                            >
                                Mark As Delivered
                            </button>
                        </div>
                    )} */}
                </div>
            </div>
            <div className='flex flex-col space-y-4 w-11/12 lg:w-4/12 mx-auto'>
                <div className='flex flex-col space-y-4 bg-white shadow-sm w-full h-fit px-10 py-5'>
                    <h1 className='card-title border-b-2 pb-4'>
                        Checkout Summary
                    </h1>
                    <CheckoutSummary />
                </div>

                {!orderDetails?.isPaid && (
                    <div>
                        <PayPalButtons
                            createOrder={createOrder}
                            onApprove={onApprove}
                            onError={onError}
                        ></PayPalButtons>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Payment
