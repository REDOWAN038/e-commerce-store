import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa"

const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating)
    const halfStar = rating % 1 !== 0 // Check if there's a half star
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0)

    return (
        <span className='flex'>
            {Array.from({ length: fullStars }, (_, idx) => (
                <FaStar key={`full-${idx}`} className='text-orange-400' />
            ))}
            {halfStar && <FaStarHalfAlt className='text-orange-400' />}
            {Array.from({ length: emptyStars }, (_, idx) => (
                <FaRegStar key={`empty-${idx}`} className='text-orange-400' />
            ))}
        </span>
    )
}

export default StarRating
