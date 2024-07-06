import { BsCart2 } from "react-icons/bs"
import { FaHeart } from "react-icons/fa6"
import {
    getFavoritesFromLocalStorage,
    removeFavoriteFromLocalStorage,
} from "../utils/favourites"
import { useDispatch } from "react-redux"
import { setFavorites } from "../features/favourites/favouriteSlice"
import { Link } from "react-router-dom"
import { addToCart } from "../features/cart/cartSlice"
import { showToast } from "../utils/toast"

const Favourites = ({ fav }) => {
    const dispatch = useDispatch()
    const handleFavClick = () => {
        removeFavoriteFromLocalStorage(fav?._id)
        dispatch(setFavorites(getFavoritesFromLocalStorage()))
    }

    const handleAddToCart = (orderQuantity) => {
        if (fav?.quantity > 0) {
            dispatch(addToCart({ ...fav, orderQuantity }))
            showToast("Product Added to Cart", "success")
        } else {
            showToast("Out of Stock", "error")
        }
    }

    return (
        <div className='flex items-center border-b gap-4'>
            <div className='w-10'>
                <div className='avatar'>
                    <div className='w-10 rounded-full'>
                        <img src={fav?.images[0]} />
                    </div>
                </div>
            </div>
            <div className='flex flex-col flex-1'>
                <Link to={`/product/details/${fav?.slug}`}>
                    <h1 className='line-clamp-1 font-bold'>{fav?.name}</h1>
                </Link>
                <div className='flex items-center justify-between'>
                    <span className='flex text-sm'>{fav?.price}$</span>
                    <div className='flex gap-2'>
                        <FaHeart
                            className='cursor-pointer fill-pink-700 w-4 h-4'
                            onClick={handleFavClick}
                        />
                        <BsCart2
                            className='cursor-pointer w-4 h-4'
                            onClick={() => handleAddToCart(1)}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Favourites
