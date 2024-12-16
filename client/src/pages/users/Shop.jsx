import axios from "axios"
import { useEffect, useState } from "react"
import CategoryFilter from "../../components/CategoryFilter"
import { showToast } from "../../utils/toast"
import BrandFilter from "../../components/BrandFilter"
import ProductCard from "../../components/Product/ProductCard"
import PriceFilter from "../../components/PriceFilter"
import SortFilter from "../../components/SortFilrer"
import { useSelector } from "react-redux"
import { selectAllFilters } from "../../features/filter/selector"
import FilterModal from "../../modal/FilterModal"
import Pagination from "../../components/Pagination"
import Loading from "../../components/Loading"

const Shop = () => {
    const [categories, setCategories] = useState([])
    const [productData, setProductData] = useState([])
    const [totalProducts, setTotalProducts] = useState()
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const [uniqueBrands, setUniqueBrands] = useState([])
    const filter = useSelector(selectAllFilters)
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const toggleModal = () => {
        setIsOpen(!isOpen)
    }

    const handlePageClick = (val) => {
        setPage(val)
    }

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
            if (filter.maxPrice) {
                queryParams.append("maxPrice", filter.maxPrice)
            }

            if (filter.sortOption) {
                queryParams.append("sortOption", filter.sortOption || "")
            }

            filter.categories?.forEach((category) =>
                queryParams.append("categories", category)
            )

            filter.brands?.forEach((brand) =>
                queryParams.append("brands", brand)
            )

            const res = await axios.get(
                `${
                    import.meta.env.VITE_SERVER_URL
                }/api/v1/product?${queryParams}`
            )

            if (res?.data?.success) {
                setProductData(res?.data?.payload?.products)
                setTotalProducts(res?.data?.payload?.pagination?.totalProducts)
                setTotalPages(res?.data?.payload?.pagination?.totalPages)
            }
        } catch (error) {
            showToast("Something Went Wrong", "error")
        } finally {
            setIsLoading(false)
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
    }, [filter, page])

    useEffect(() => {
        // Extract unique brands whenever productData changes
        const brands = productData.map((product) => product.brand)
        const uniqueBrandsArray = [...new Set(brands)]
        setUniqueBrands(uniqueBrandsArray)
    }, [productData])

    if (isLoading) {
        return <Loading />
    }

    return (
        <div className='flex justify-center mt-5 px-10 py-10 gap-10'>
            {/* filter */}
            <div className='hidden lg:flex flex-col w-1/6 px-5 py-5 h-fit bg-white rounded-md shadow-lg'>
                <h3 className='text-lg font-semibold border-b border-slate-300 pb-5'>
                    Filter by:
                </h3>
                <CategoryFilter categories={categories} />
                <BrandFilter brands={uniqueBrands} />
                <PriceFilter />
            </div>
            {/* products */}
            <div className='flex flex-col gap-5'>
                <div className='flex lg:hidden items-center justify-center gap-10'>
                    <button
                        onClick={toggleModal}
                        className='p-2 border rounded-md w-44 bg-white'
                    >
                        Filter
                    </button>
                    <SortFilter />
                </div>
                <div className='flex items-center justify-between'>
                    <span className='text-xl font-bold'>
                        {totalProducts} Products found
                    </span>
                    <div className='hidden lg:flex'>
                        <SortFilter />
                    </div>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mx-auto'>
                    {productData.map((product) => (
                        <ProductCard
                            key={product._id}
                            product={product}
                            type='Top'
                        />
                    ))}
                </div>

                <Pagination
                    totalPages={totalPages}
                    onPageClick={handlePageClick}
                    currentPage={page}
                />
            </div>
            {/* sm and md screen filter */}
            <FilterModal
                isOpen={isOpen}
                toggleModal={toggleModal}
                categories={categories}
                brands={uniqueBrands}
            />
        </div>
    )
}

export default Shop
