import { useEffect, useState } from "react"
import { showToast } from "../../utils/toast"
import axios from "axios"
import { Link } from "react-router-dom"
// import AdminProductCard from "../../components/Product/AdminProductCard"
import Pagination from "../../components/Pagination"
import ProductCard from "../../components/Product/ProductCard"

const AllProducts = () => {
    const [productData, setProductData] = useState([])
    const [totalProducts, setTotalProducts] = useState()
    const [totalPages, setTotalPages] = useState(0)
    const [page, setPage] = useState(1)

    const handlePageClick = (val) => {
        setPage(val)
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
                showToast("All Products", "success")
                setProductData(res?.data?.payload?.products)
                setTotalProducts(res?.data?.payload?.pagination?.totalProducts)
                setTotalPages(res?.data?.payload?.pagination?.totalPages)
            }
        } catch (error) {
            showToast("Something Went Wrong", "error")
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                await getAllProducts()
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page])

    return (
        <div className='flex flex-col'>
            <div className='flex justify-between mx-10 mb-10 mt-16'>
                <h1 className='text-xl'>All Products ({totalProducts})</h1>
                <Link to='/admin/add-product'>
                    <button className='btn btn-primary btn-sm md:btn-normal'>
                        Add Product
                    </button>
                </Link>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mx-auto'>
                {productData.map((product, idx) => (
                    <ProductCard
                        key={idx}
                        product={product}
                        type='Top'
                        user='Admin'
                    />
                ))}
            </div>
            <Pagination
                totalPages={totalPages}
                onPageClick={handlePageClick}
                currentPage={page}
            />
        </div>
    )
}

export default AllProducts
