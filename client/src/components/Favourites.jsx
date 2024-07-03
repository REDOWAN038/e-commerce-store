import { BsCart2 } from "react-icons/bs"
import { FaHeart } from "react-icons/fa6"
import { removeFavoriteFromLocalStorage } from "../utils/favourites"
import { useDispatch } from "react-redux"
import { removeFromFavorites } from "../features/favourites/favouriteSlice"

const Favourites = ({ fav }) => {
    const dispatch = useDispatch()
    const handleFavClick = () => {
        console.log("hi ")
        removeFavoriteFromLocalStorage(fav?._id)
        dispatch(removeFromFavorites(fav?._id))
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
                <h1 className='line-clamp-1'>{fav?.name}</h1>
                <div className='flex items-center justify-between'>
                    <span className='flex text-sm font-bold'>
                        {fav?.price}$
                    </span>
                    <div className='flex gap-2'>
                        <FaHeart
                            className='cursor-pointer fill-pink-700 w-4 h-4'
                            onClick={handleFavClick}
                        />
                        <BsCart2 className='cursor-pointer w-4 h-4' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Favourites
