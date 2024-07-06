import ReviewForm from "../../form/ReviewForm/ReviewForm"
import Ratings from "../Ratings"
import StarRating from "../StarRating"

const ProductReviewInfo = ({ product, ratingsCount }) => {
    return (
        <div className='border-b-2'>
            <div className='flex flex-col gap-10 px-5 py-5 md:px-10 md:py-10 md:mx-14'>
                <h1 className='text-2xl'>Reviews and Ratings</h1>
                {/* small and medium */}
                <div className='flex lg:hidden items-center justify-between'>
                    <div className='flex flex-col gap-1'>
                        <h2 className='text-3xl font-bold'>
                            {product?.rating}
                        </h2>
                        <StarRating rating={product?.rating} />
                        <h2 className='text-base'>
                            {product?.reviews?.length} Reviews
                        </h2>
                    </div>
                    <div className='w-1/2'>
                        <Ratings ratingsCount={ratingsCount} />
                    </div>
                </div>
                <div className='flex lg:hidden items-center justify-between'>
                    <ReviewForm />
                </div>
                {/* large */}
                <div className='hidden lg:flex items-center justify-between'>
                    <div className='flex flex-col gap-1'>
                        <h2 className='text-3xl font-bold'>
                            {product?.rating}
                        </h2>
                        <StarRating rating={product?.rating} />
                        <h2 className='text-base'>
                            {product?.reviews?.length} Reviews
                        </h2>
                    </div>
                    <div>
                        <ReviewForm />
                    </div>
                    <div className='w-1/3'>
                        <Ratings
                            numOfReviews={product?.reviews?.length}
                            ratingsCount={ratingsCount}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductReviewInfo
