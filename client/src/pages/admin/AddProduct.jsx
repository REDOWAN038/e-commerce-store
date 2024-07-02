import { useState } from "react"
import { showToast } from "../../utils/toast"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import ProductForm from "../../form/ProductForm/ProductForm"

const AddProduct = () => {
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const handleSave = async (formData) => {
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/api/v1/admin/product`,
                formData,
                { withCredentials: true }
            )

            if (res?.data?.success) {
                setIsLoading(false)
                showToast(res?.data?.message, "success")
                navigate("/")
            }
        } catch (error) {
            setIsLoading(false)
            if (
                error?.response?.status === 403 ||
                error?.response?.status === 409
            ) {
                showToast(error?.response?.data?.message, "error")
                navigate("/signin")
            } else {
                showToast("something went wrong...", "error")
            }
        }
    }
    return (
        <>
            <ProductForm
                onSave={handleSave}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                method='Add'
            />
        </>
    )
}

export default AddProduct
