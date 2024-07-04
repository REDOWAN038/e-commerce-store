import { FaRegStar, FaStar } from "react-icons/fa"

const StarRating = ({ rating }) => {
    return (
        <span className='flex'>
            {Array.from({ length: rating }).map((idx) => (
                <FaStar key={idx} className='fill-yellow-400' />
            ))}
            {Array.from({ length: 5 - rating }).map((idx) => (
                <FaRegStar key={idx} />
            ))}
        </span>
    )
}

export default StarRating
