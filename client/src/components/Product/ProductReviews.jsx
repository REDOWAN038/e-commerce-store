import ReviewForm from "../../form/ReviewForm/ReviewForm"
import Ratings from "../Ratings"
import StarRating from "../StarRating"

const ProductReviews = ({ product, ratingsCount }) => {
    return (
        <div className='flex flex-col gap-10 px-10'>
            <h1 className='text-2xl'>Reviews and Ratings</h1>
            <div className='flex items-center justify-between'>
                <div className='flex flex-col gap-1'>
                    <h2 className='text-3xl font-bold'>{product?.rating}</h2>
                    <StarRating rating={product?.rating} />
                    <h2 className='text-base'>
                        {product?.reviews?.length} Reviews
                    </h2>
                </div>
                <div className=''>
                    <ReviewForm />
                </div>
                <div className='w-1/3'>
                    <Ratings ratingsCount={ratingsCount} />
                </div>
            </div>
        </div>
    )
}

export default ProductReviews
