import axios from "axios"
import moment from "moment"
import { useEffect, useState } from "react"
import { showToast } from "../../utils/toast"
import { Link } from "react-router-dom"

const AllOrders = () => {
    const [orders, setOrders] = useState([])

    const getAllOrders = async () => {
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_SERVER_URL}/api/v1/admin/order`,
                {
                    withCredentials: true,
                }
            )

            if (res?.data?.success) {
                showToast("All Orders", "success")
                setOrders(res?.data?.payload?.orders)
            }
        } catch (error) {
            showToast(error?.response?.data?.message, "error")
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                await getAllOrders()
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className='flex flex-col gap-8 mt-10 w-11/12 h-[400px] mx-auto'>
            <div className='w-full flex flex-col items-center overflow-y-auto'>
                <h1 className='mt-10 mb-10 text-lg font-bold'>All Orders</h1>
                <div className='flex flex-col bg-white shadow-lg w-full gap-6 px-10 py-5 h-fit rounded-lg'>
                    <div className='overflow-x-auto'>
                        <table className='w-full'>
                            <thead className='border-b-2'>
                                <tr>
                                    <th className='p-2 text-center whitespace-nowrap'></th>
                                    <th className='p-2 text-center whitespace-nowrap'>
                                        Order ID
                                    </th>
                                    <th className='p-2 text-center whitespace-nowrap'>
                                        Name
                                    </th>
                                    <th className='p-2 text-center whitespace-nowrap'>
                                        Mobile
                                    </th>
                                    <th className='p-2 text-center whitespace-nowrap'>
                                        Total Items
                                    </th>
                                    <th className='p-2 text-center whitespace-nowrap'>
                                        Total Price($)
                                    </th>
                                    <th className='p-2 text-center whitespace-nowrap'>
                                        Payment
                                    </th>
                                    <th className='p-2 text-center whitespace-nowrap'>
                                        Delivery
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders?.map((order, idx) => (
                                    <tr
                                        key={order._id}
                                        className=' cursor-pointer hover:bg-gray-300'
                                    >
                                        <th className='p-2 text-center whitespace-nowrap'>
                                            {idx + 1}
                                        </th>
                                        <td className='p-2 text-center whitespace-nowrap'>
                                            <Link to={`/payment/${order?._id}`}>
                                                {order?._id}
                                            </Link>
                                        </td>
                                        <td className='p-2 text-center whitespace-nowrap'>
                                            {order?.user?.name}
                                        </td>
                                        <td className='p-2 text-center whitespace-nowrap'>
                                            {order?.phone}
                                        </td>
                                        <td className='p-2 text-center whitespace-nowrap'>
                                            {order?.orderItems?.length}
                                        </td>
                                        <td className='p-2 text-center whitespace-nowrap'>
                                            {order?.totalPrice}
                                        </td>
                                        <td className='p-2 text-center whitespace-nowrap'>
                                            {order?.isPaid ? (
                                                <p className='text-green-700'>
                                                    Paid on{" "}
                                                    {moment(
                                                        order?.paidAt
                                                    ).format("Do MMMM YYYY")}
                                                </p>
                                            ) : (
                                                <p className='text-red-700'>
                                                    Pending
                                                </p>
                                            )}
                                        </td>
                                        <td className='p-2 text-center whitespace-nowrap'>
                                            {order?.isDelivered ? (
                                                <p className='text-green-700'>
                                                    Delivered on{" "}
                                                    {moment(
                                                        order?.deliveredAt
                                                    ).format("Do MMMM YYYY")}
                                                </p>
                                            ) : (
                                                <p className='text-red-700'>
                                                    Pending
                                                </p>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AllOrders
