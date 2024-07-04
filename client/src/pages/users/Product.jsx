import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import ProductDetails from "../../components/Product/ProductDetails"
import { showToast } from "../../utils/toast"

const Product = () => {
    const { slug } = useParams()
    const [product, setProduct] = useState([])

    const getProductDetails = async () => {
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_SERVER_URL}/api/v1/product/${slug}`
            )

            if (res?.data?.success) {
                setProduct(res?.data?.payload?.product)
            }
        } catch (error) {
            showToast(error?.response?.data?.message, "error")
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                await getProductDetails()
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className='flex flex-col mt-8'>
            <ProductDetails product={product} />
        </div>
    )
}

export default Product
