import axios from "axios"
import { useEffect, useState } from "react"
import CategoryFilter from "../../components/CategoryFilter"
import { showToast } from "../../utils/toast"
import BrandFilter from "../../components/BrandFilter"
import ProductCard from "../../components/Product/ProductCard"
import PriceFilter from "../../components/PriceFilter"

const Shop = () => {
    const [categories, setCategories] = useState([])
    const [productData, setProductData] = useState([])
    const [page, setPage] = useState(1)
    const [uniqueBrands, setUniqueBrands] = useState([])

    const getAllCategories = async () => {
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_SERVER_URL}/api/v1/category`
            )

            if (res?.data?.success) {
                setCategories(res?.data?.payload?.categories)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getAllProducts = async () => {
        try {
            const queryParams = new URLSearchParams()
            queryParams.append("page", page || 1)

            const res = await axios.get(
                `${
                    import.meta.env.VITE_SERVER_URL
                }/api/v1/product?${queryParams}`
            )

            if (res?.data?.success) {
                setProductData(res?.data?.payload?.products)
                // setTotalProducts(res?.data?.payload?.pagination?.totalProducts)
                // setTotalPages(res?.data?.payload?.pagination?.totalPages)
            }
        } catch (error) {
            showToast("Something Went Wrong", "error")
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                await getAllCategories()
                await getAllProducts()
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        // Extract unique brands whenever productData changes
        const brands = productData.map((product) => product.brand)
        const uniqueBrandsArray = [...new Set(brands)]
        setUniqueBrands(uniqueBrandsArray)
    }, [productData])

    return (
        <div className='flex mt-5 px-10 py-10 gap-10'>
            {/* filter */}
            <div className='flex flex-col w-1/6 px-3 py-3 h-fit bg-white rounded-md'>
                <CategoryFilter categories={categories} />
                <BrandFilter brands={uniqueBrands} />
                <PriceFilter />
            </div>
            {/* products */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mx-auto'>
                {productData.map((product, idx) => (
                    <ProductCard key={idx} product={product} type='Top' />
                ))}
            </div>
        </div>
    )
}

export default Shop
