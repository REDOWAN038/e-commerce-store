import { FaRegStar, FaStar } from "react-icons/fa"

const StarRating = ({ rating }) => {
    const floor = Math.floor(rating)
    return (
        <span className='flex'>
            {Array.from({ length: floor }).map((idx) => (
                <FaStar key={idx} className='text-orange-400' />
            ))}
            {Array.from({ length: 5 - floor }).map((idx) => (
                <FaRegStar key={idx} className='text-orange-400' />
            ))}
        </span>
    )
}

export default StarRating
