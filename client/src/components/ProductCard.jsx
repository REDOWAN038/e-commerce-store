import { Link } from "react-router-dom"

import { MdDelete } from "react-icons/md"
import { MdEdit } from "react-icons/md"
import axios from "axios"
import { showToast } from "../utils/toast"

const ProductCard = ({ product }) => {
    const handleDelete = async (slug) => {
        const isConfirmed = window.confirm(
            "Are you sure you want to delete this product?"
        )
        if (isConfirmed) {
            try {
                const res = await axios.delete(
                    `${
                        import.meta.env.VITE_SERVER_URL
                    }/api/v1/admin/product/${slug}`,
                    { withCredentials: true }
                )

                if (res?.data?.success) {
                    showToast(res?.data?.message, "success")
                    window.location.reload()
                }
            } catch (error) {
                if (
                    error?.response?.status === 403 ||
                    error?.response?.status === 404
                ) {
                    showToast(error?.response?.data?.message, "error")
                } else {
                    showToast("something went wrong", "error")
                }
            }
        }
    }

    return (
        <div className='grid grid-cols-1 xl:grid-cols-2 border border-slate-300 rounded-lg p-8 gap-8'>
            <div className='w-full h-36'>
                <img
                    src={product.images[0]}
                    className='w-full h-full object-cover object-center'
                />
            </div>
            <div className='grid grid-rows-[1fr_1fr_1fr] lg:grid-rows-[0.5fr_0.5fr_0.5fr]'>
                <div>
                    <div className='flex items-center'>
                        {/* <span className='flex'>
                          {Array.from({ length: product.starRating }).map(
                              (idx) => (
                                  <AiFillStar
                                      key={idx}
                                      className='fill-yellow-400'
                                  />
                              )
                          )}
                      </span> */}
                    </div>
                    <Link
                        to={`/admin/update-product/${product.slug}`}
                        className='text-base font-bold cursor-pointer'
                    >
                        {product.name}
                    </Link>
                </div>

                <div>
                    <div className='line-clamp-2'>{product.description}</div>
                </div>

                <div className='flex items-center justify-between whitespace-nowrap gap-12'>
                    <div>
                        <span className='text-sm font-bold'>
                            ${product.price}
                        </span>
                    </div>
                    <div className='flex gap-1'>
                        <div className='tooltip' data-tip='edit'>
                            <Link to={`/admin/update-product/${product.slug}`}>
                                <MdEdit className='cursor-pointer text-blue-600 w-5 h-5' />
                            </Link>
                        </div>
                        <div className='tooltip' data-tip='delete'>
                            <MdDelete
                                className='cursor-pointer text-red-600 w-5 h-5'
                                onClick={() => handleDelete(product.slug)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductCard
