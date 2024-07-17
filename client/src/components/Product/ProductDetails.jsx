import { useState } from "react"
import StarRating from "../StarRating"
import { useDispatch } from "react-redux"
import { addToCart } from "../../features/cart/cartSlice"
import { showToast } from "../../utils/toast"

const ProductDetails = ({ product }) => {
    const [imageIdx, setImageIdx] = useState(0)
    const dispatch = useDispatch()
    const [orderQuantity, setOrderQuantity] = useState(1)

    const handleAddToCart = () => {
        if (product?.quantity > 0) {
            dispatch(addToCart({ ...product, orderQuantity }))
            showToast("Product Added to Cart", "success")
        } else {
            showToast("Out of Stock", "error")
        }
    }

    return (
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-0 rounded-none px-10 lg:px-20 w-full md:w-11/12 mx-auto border-b-2 py-20'>
            <div className='grid grid-cols-1 gap-4 w-[400px] md:w-[500px]'>
                {/* <div className='w-50 h-50'> */}
                <img
                    src={product?.images?.[imageIdx]}
                    className='w-[400px] h-[400px] md:w-[500px] md:h-[500px] object-cover border border-black'
                    alt={product?.name}
                />
                {/* </div> */}
                <div className='grid grid-cols-4 gap-3'>
                    {product?.images?.map((image, idx) => (
                        <div key={idx} className='w-50 h-50'>
                            <img
                                src={image}
                                className='w-full h-full object-cover border border-black cursor-pointer'
                                alt={product?.name}
                                onClick={() => setImageIdx(idx)}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className='flex flex-col space-y-20 flex-1'>
                <div className='flex flex-col space-y-1'>
                    <div className='flex items-center gap-60 md:gap-80 lg:gap-96'>
                        <h2 className='card-title'>{product?.name}</h2>
                        {product?.quantity > 0 ? (
                            <h1 className='text-green-700'>In Stock</h1>
                        ) : (
                            <h1 className='text-red-700'>Out of Stock</h1>
                        )}
                    </div>
                    <span className='text-red-700'>{product?.brand}</span>
                    <div className='flex items-center gap-5'>
                        <StarRating rating={product?.rating} />
                        <span className=''>
                            {product?.reviews?.length} reviews
                        </span>
                    </div>
                </div>
                <div className='flex flex-col space-y-8'>
                    <p className='text-base'>{product?.description}</p>
                    <span className='text-3xl font-bold'>
                        ${product?.price}
                    </span>
                </div>
                <div>
                    {product?.quantity > 0 ? (
                        <div className='flex flex-col space-y-3'>
                            <div className='flex items-center gap-2'>
                                <span className='text-base text-green-700'>
                                    {`${product?.quantity} items left`}
                                </span>
                                {product?.sold > 0 ? (
                                    <span className='text-sm text-red-700'>
                                        {`(${product?.sold} items sold)`}
                                    </span>
                                ) : null}
                            </div>
                            <div className='flex items-center gap-3'>
                                <input
                                    type='number'
                                    min={1}
                                    max={product?.quantity}
                                    className='input input-bordered w-36'
                                    value={orderQuantity}
                                    onChange={(e) =>
                                        setOrderQuantity(e.target.value)
                                    }
                                />
                                <button
                                    className='btn btn-primary w-28'
                                    onClick={() => handleAddToCart()}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ) : (
                        <span className='text-red-700'>Out of Stock</span>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ProductDetails
