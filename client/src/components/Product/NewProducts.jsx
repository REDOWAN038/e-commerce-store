import { useEffect, useState } from "react"
import { showToast } from "../../utils/toast"
import axios from "axios"
import ProductCard from "./ProductCard"

const NewProducts = () => {
    const [productData, setProductData] = useState([])

    const getNewProducts = async () => {
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_SERVER_URL}/api/v1/product/new`
            )

            if (res?.data?.success) {
                setProductData(res?.data?.payload?.products)
            }
        } catch (error) {
            showToast("Something Went Wrong", "error")
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                await getNewProducts()
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className='flex flex-col'>
            <h1 className='flex items-center justify-center text-xl font-bold mb-10'>
                <span className='border-b-4 border-emerald-500 animate-pulse'>
                    New Arrivals
                </span>
            </h1>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mx-auto'>
                {productData.map((product, idx) => (
                    <ProductCard key={idx} product={product} type='New' />
                ))}
            </div>
        </div>
    )
}

export default NewProducts
