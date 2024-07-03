import { BsCart2 } from "react-icons/bs"
import { FaHeart, FaRegHeart } from "react-icons/fa6"
import { AiFillStar } from "react-icons/ai"
import moment from "moment"
import { useEffect, useState } from "react"
import {
    addFavoriteToLocalStorage,
    isFavourite,
    removeFavoriteFromLocalStorage,
    getFavoritesFromLocalStorage,
} from "../../utils/favourites"
import { useDispatch } from "react-redux"
import {
    addToFavorites,
    removeFromFavorites,
    setFavorites,
} from "../../features/favourites/favouriteSlice"

const ProductCard = ({ product, type }) => {
    const dispatch = useDispatch()
    const [favourite, setFavourite] = useState()

    const handleAddToFavourites = () => {
        if (favourite) {
            removeFavoriteFromLocalStorage(product?._id)
            dispatch(removeFromFavorites(product?._id))
            setFavourite(false)
        } else {
            addFavoriteToLocalStorage(product)
            dispatch(addToFavorites(product))
            setFavourite(true)
        }
    }

    useEffect(() => {
        if (isFavourite(product?._id)) {
            setFavourite(true)
        } else {
            setFavourite(false)
        }
        dispatch(setFavorites(getFavoritesFromLocalStorage()))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [favourite])
    return (
        <div className='card card-compact bg-base-100 w-80 h-80 lg:w-96 lg:h-96 shadow-xl'>
            <figure className='h-1/2'>
                <img src={product?.images[0]} alt={product?.name} />
            </figure>
            <div className='card-body'>
                <div className='flex items-center justify-between'>
                    <h2 className='card-title'>{product?.name}</h2>
                    {type === "New" ? (
                        <span>{moment(product?.createdAt).fromNow()}</span>
                    ) : product?.quantity > 0 ? (
                        <span className='text-green-700 animate-pulse'>
                            {`${product?.quantity} items left`}
                        </span>
                    ) : (
                        <span className='text-red-700'>Out of Stock</span>
                    )}
                </div>
                <span className='-mt-3 text-red-950'>{product?.brand}</span>
                {type === "Top" ? (
                    <span className='flex'>
                        {Array.from({ length: product?.rating }).map((idx) => (
                            <AiFillStar key={idx} className='fill-yellow-400' />
                        ))}
                    </span>
                ) : null}
                <p className='line-clamp-2 lg:line-clamp-3'>
                    {product?.description}
                </p>
                <div className='flex items-center justify-between whitespace-nowrap gap-12'>
                    <div>
                        <span className='text-sm font-bold'>
                            ${product.price}
                        </span>
                    </div>
                    <div className='flex gap-3'>
                        <div className='tooltip' data-tip='favourite'>
                            {favourite ? (
                                <FaHeart
                                    className='cursor-pointer fill-pink-700 w-5 h-5'
                                    onClick={handleAddToFavourites}
                                />
                            ) : (
                                <FaRegHeart
                                    className='cursor-pointer w-5 h-5'
                                    onClick={handleAddToFavourites}
                                />
                            )}
                        </div>
                        <div className='tooltip' data-tip='add to cart'>
                            <BsCart2 className='cursor-pointer w-5 h-5' />
                            {/* <MdDelete
                                className='cursor-pointer text-red-600 w-5 h-5'
                                onClick={() => handleDelete(product.slug)}
                            /> */}
                        </div>
                    </div>
                </div>
                {/* <div className='card-actions justify-end'>
                    <button className='btn btn-primary'>Buy Now</button>
                </div> */}
            </div>
        </div>
    )
}

export default ProductCard
