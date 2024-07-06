import RatingBar from "./RatingBar"

const Ratings = ({ numOfReviews, ratingsCount }) => {
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
                        numOfReviews={numOfReviews}
                    />
                )
            })}
        </div>
    )
}

export default Ratings
