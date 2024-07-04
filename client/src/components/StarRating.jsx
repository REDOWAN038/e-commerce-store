import { FaRegStar, FaStar } from "react-icons/fa"

const StarRating = ({ rating }) => {
    return (
        <span className='flex'>
            {Array.from({ length: rating }).map((idx) => (
                <FaStar key={idx} className='text-orange-400' />
            ))}
            {Array.from({ length: 5 - rating }).map((idx) => (
                <FaRegStar key={idx} className='text-orange-400' />
            ))}
        </span>
    )
}

export default StarRating
