import { Link } from "react-router-dom"
import { BsCart2 } from "react-icons/bs"
import { FaHeart, FaRegHeart } from "react-icons/fa6"
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
import StarRating from "../StarRating"
import { addToCart } from "../../features/cart/cartSlice"
import { showToast } from "../../utils/toast"

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

    const handleAddToCart = (orderQuantity) => {
        if (product?.quantity > 0) {
            dispatch(addToCart({ ...product, orderQuantity }))
            showToast("Product Added to Cart", "success")
        } else {
            showToast("Out of Stock", "error")
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
                    <Link to={`/product/details/${product?.slug}`}>
                        <h2 className='card-title'>{product?.name}</h2>
                    </Link>
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
                    <StarRating rating={product?.rating} />
                ) : null}
                <p className='line-clamp-2 lg:line-clamp-3'>
                    {product?.description.substring(0, 160)}...
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
                            <BsCart2
                                className='cursor-pointer w-5 h-5'
                                onClick={() => handleAddToCart(1)}
                            />
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
