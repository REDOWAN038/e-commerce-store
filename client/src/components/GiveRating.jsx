import { FaStar } from "react-icons/fa"

const GiveRating = ({ onClick, rating }) => {
    return (
        <div className='flex'>
            {[...Array(5)].map((_, index) => {
                const starValue = index + 1
                return (
                    <FaStar
                        key={starValue}
                        className={`cursor-pointer ${
                            starValue <= rating
                                ? "text-orange-400"
                                : "text-gray-300"
                        }`}
                        onClick={() => onClick(starValue)}
                    />
                )
            })}
        </div>
    )
}

export default GiveRating
