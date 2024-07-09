import { useDispatch } from "react-redux"
import ShippingForm from "../../form/ShippingAddress/ShippingForm"
import { useNavigate } from "react-router-dom"
import {
    saveBuyerDetails,
    savePaymentMethod,
    saveShippingAddress,
} from "../../features/cart/cartSlice"

const ShippingAddress = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = (data) => {
        dispatch(
            saveShippingAddress({
                country: "Bangladesh",
                division: data.division,
                district: data.district,
                address: data.address,
            })
        )
        dispatch(savePaymentMethod(data.paymentMethod))
        dispatch(
            saveBuyerDetails({
                name: data.name,
                phone: data.phone,
            })
        )
        navigate("/cart")
    }

    return (
        <>
            <ShippingForm onSave={handleSubmit} />
        </>
    )
}

export default ShippingAddress
