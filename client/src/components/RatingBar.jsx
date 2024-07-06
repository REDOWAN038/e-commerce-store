import { FaStar, FaRegStar } from "react-icons/fa"

const RatingBar = ({ rating, count, numOfReviews }) => {
    const percentage = (count / numOfReviews) * 100

    return (
        <div className='flex items-center space-x-2'>
            <div className='flex'>
                {[...Array(5)].map((_, i) => (
                    <span key={i}>
                        {i < rating ? (
                            <FaStar className='text-orange-400' />
                        ) : (
                            <FaRegStar className='text-orange-400' />
                        )}
                    </span>
                ))}
            </div>
            <div className='flex-1 h-2 bg-gray-200 rounded'>
                <div
                    className='h-full bg-orange-400 rounded'
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
            <span className='ml-2 text-gray-600'>{count}</span>
        </div>
    )
}

export default RatingBar
