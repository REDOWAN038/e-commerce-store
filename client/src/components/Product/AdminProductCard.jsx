import { Link } from "react-router-dom"
import { MdDelete } from "react-icons/md"
import { MdEdit } from "react-icons/md"
import axios from "axios"
import { showToast } from "../../utils/toast"

const AdminProductCard = ({ product }) => {
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
        <div className='card lg:card-side bg-base-100 shadow-xl'>
            <figure>
                <img src={product?.images[0]} alt='Album' />
            </figure>
            <div className='card-body'>
                <h2 className='card-title'>{product?.name}</h2>
                <p className='line-clamp-2'>{product?.description}</p>
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

export default AdminProductCard
