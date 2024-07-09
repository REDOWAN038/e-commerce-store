import { useState } from "react"
import divisionDistrictData from "../../utils/divisionDistrictData"
import CheckoutSummary from "../../components/CheckoutSummary"
import { useDispatch, useSelector } from "react-redux"
import { selectUser } from "../../features/auth/selector"
import axios from "axios"
import { selectCartItems } from "../../features/cart/selector"
import { clearCartItems } from "../../features/cart/cartSlice"
import { useNavigate } from "react-router-dom"
import { showToast } from "../../utils/toast"
import OrderDetails from "../../components/OrderDetails"

const CheckOut = () => {
    const [phone, setPhone] = useState("")
    const [paymentMethod, setPaymentMethod] = useState("")
    const [selectedDistrict, setSelectedDistrict] = useState("")
    const [address, setAddress] = useState("")
    const [selectedDivision, setSelectedDivision] = useState("")
    const [districts, setDistricts] = useState([])
    const user = useSelector(selectUser)
    const cartItems = useSelector(selectCartItems)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleDivisionChange = (e) => {
        const selectedDivision = e.target.value
        setSelectedDivision(selectedDivision)
        setDistricts(divisionDistrictData[selectedDivision] || [])
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/api/v1/order`,
                {
                    orderItems: cartItems,
                    phone,
                    shippingAddress: {
                        address,
                        division: selectedDivision,
                        district: selectedDistrict,
                        country: "Bangladesh",
                    },
                    paymentMethod,
                },
                { withCredentials: true }
            )

            if (res?.data?.success) {
                dispatch(clearCartItems())
                // showToast(res?.data?.message, "success")
                navigate(`/payment/${res?.data?.payload?.placedOrder?._id}`)
            }
        } catch (error) {
            if (
                error?.response?.status === 400 ||
                error?.response?.status === 404
            ) {
                showToast(error?.response?.data?.message, "error")
            } else {
                showToast("something went wrong...", "error")
            }
        }
    }

    return (
        <div className='flex flex-col lg:flex-row'>
            {/* shipping address */}
            <div className='flex flex-col bg-base-100 shadow-xl w-11/12 lg:w-7/12 mx-auto gap-6 px-10 py-5 mt-10'>
                <div className='w-full'>
                    <h1 className='flex justify-center mt-5 text-3xl'>
                        Shipping Address
                    </h1>
                    <form className='card-body'>
                        {/* name */}
                        <div className='form-control'>
                            <label className='label'>
                                <span className='label-text'>Name</span>
                            </label>
                            <input
                                type='text'
                                placeholder='name'
                                className='input input-bordered'
                                value={user?.name}
                                disabled
                            />
                        </div>
                        {/* phone */}
                        <div className='form-control'>
                            <label className='label'>
                                <span className='label-text'>Phone Number</span>
                            </label>
                            <input
                                type='tel'
                                pattern='01[0-9]{9}'
                                placeholder='01XXXXXXXXX'
                                className='input input-bordered'
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />
                        </div>
                        {/* divisions */}
                        <div className='form-control'>
                            <label className='label'>
                                <span className='label-text'>Division</span>
                            </label>
                            <select
                                className='select select-bordered w-full max-w-xs'
                                required
                                value={selectedDivision}
                                onChange={handleDivisionChange}
                            >
                                <option value=''>Select a division</option>
                                {Object.keys(divisionDistrictData).map(
                                    (division, idx) => (
                                        <option key={idx} value={division}>
                                            {division}
                                        </option>
                                    )
                                )}
                            </select>
                        </div>
                        {/* districts */}
                        <div className='form-control'>
                            <label className='label'>
                                <span className='label-text'>District</span>
                            </label>
                            <select
                                className='select select-bordered w-full max-w-xs'
                                required
                                value={selectedDistrict}
                                onChange={(e) =>
                                    setSelectedDistrict(e.target.value)
                                }
                            >
                                <option value=''>Select a district</option>
                                {districts.map((district, idx) => (
                                    <option key={idx} value={district}>
                                        {district}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {/* address. */}
                        <div className='form-control'>
                            <label className='label'>
                                <span className='label-text'>Address</span>
                            </label>
                            <textarea
                                placeholder='Address...'
                                className='textarea textarea-bordered textarea-md w-full'
                                required
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            ></textarea>
                        </div>
                        {/* method */}
                        <div>
                            <label className='label'>
                                <span className='label-text'>
                                    Payment Method
                                </span>
                            </label>
                            <input
                                type='radio'
                                className='form-radio cursor-pointer'
                                name='paymentMethod'
                                value='PayPal'
                                onChange={(e) =>
                                    setPaymentMethod(e.target.value)
                                }
                                required
                            />
                            <span className='ml-2'>PayPal</span>
                        </div>
                    </form>
                </div>
            </div>
            {/* checkout summary */}
            <div className='flex flex-col space-y-4 bg-white shadow-sm w-11/12 lg:w-4/12 h-fit mx-auto px-10 py-5 mt-10'>
                <h1 className='card-title border-b-2 pb-4'>Order Summary</h1>
                <OrderDetails />
                <CheckoutSummary />
                <div className='flex'>
                    <button
                        className='btn btn-primary mt-5 w-full'
                        onClick={(e) => handleSubmit(e)}
                    >
                        Place Order
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CheckOut
