import RatingBar from "./RatingBar"

const Ratings = ({ ratingsCount }) => {
    const maxCount = Math.max(...ratingsCount.map((r) => r.count))

    return (
        <div className='space-y-2'>
            {[5, 4, 3, 2, 1].map((rating) => {
                const ratingData = ratingsCount.find((r) => r._id === rating)
                const count = ratingData ? ratingData.count : 0
                return (
                    <RatingBar
                        key={rating}
                        rating={rating}
                        count={count}
                        maxCount={maxCount}
                    />
                )
            })}
        </div>
    )
}

export default Ratings
