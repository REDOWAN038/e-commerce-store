import { useState } from "react"
import StarRating from "../StarRating"

const ProductDetails = ({ product }) => {
    const [numberOfItems, setNumberOfItems] = useState(1)
    return (
        <div className='flex rounded-none px-20 py-5 w-full gap-4'>
            <div className='flex items-center justify-center w-[500px] h-[500px]'>
                <div className='carousel w-full h-full'>
                    {product?.images?.map((image, idx) => (
                        <div key={idx} className='carousel-item w-full'>
                            <img
                                src={image}
                                className='w-full'
                                alt={product?.name}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className='flex flex-col justify-between px-2 py-4 space-y-10 flex-1'>
                <div className='flex flex-col space-y-1'>
                    <div className='flex items-center gap-96'>
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
                                    value={numberOfItems}
                                    onChange={(e) =>
                                        setNumberOfItems(e.target.value)
                                    }
                                    min={1}
                                    max={product?.quantity}
                                    className='input input-bordered w-36'
                                />
                                <button className='btn btn-primary w-28'>
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
