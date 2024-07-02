import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { showToast } from "../../utils/toast"
import ProductForm from "../../form/ProductForm/ProductForm"

const UpdateProduct = () => {
    const { slug } = useParams()
    const [productData, setProductData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const getSingleProduct = async () => {
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_SERVER_URL}/api/v1/product/${slug}`
            )

            if (res?.data?.success) {
                setProductData(res?.data?.payload?.product)
            }
        } catch (error) {
            showToast(error?.response?.data?.message, "error")
        }
    }

    const handleSave = async (formData) => {
        try {
            const res = await axios.put(
                `${
                    import.meta.env.VITE_SERVER_URL
                }/api/v1/admin/product/${slug}`,
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
                error?.response?.status === 401 ||
                error?.response?.status === 404 ||
                error?.response?.status === 403
            ) {
                showToast(error?.response?.data?.message, "error")
                navigate("/signin")
            } else {
                showToast("something went wrong...", "error")
            }
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                await getSingleProduct()
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <>
            <ProductForm
                onSave={handleSave}
                product={productData}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                method='Update'
            />
        </>
    )
}

export default UpdateProduct
