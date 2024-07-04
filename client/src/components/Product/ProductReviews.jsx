import moment from "moment"
import StarRating from "../StarRating"
import Person from "../../assets/person.jpg"

const ProductReviews = ({ reviews }) => {
    return (
        <div className='border-b-2'>
            <div className='flex flex-col gap-16 px-5 py-5 lg:px-10 lg:py-10 lg:mx-14'>
                {reviews?.map((review, idx) => (
                    <div key={idx} className='flex flex-col gap-3'>
                        <div className='flex gap-4'>
                            <div className='avatar'>
                                <div className='w-12 border-2 rounded-full'>
                                    <img src={Person} />
                                </div>
                            </div>
                            <div className='flex flex-col'>
                                <p className='text-black font-bold'>
                                    <span className='text-gray-400'>By </span>
                                    {review?.name}{" "}
                                    <span className='text-gray-400'>
                                        {moment(review?.createdAt).format(
                                            "Do MMMM YYYY"
                                        )}
                                    </span>
                                </p>
                                <StarRating rating={review?.rating} />
                            </div>
                        </div>
                        <p className='text-slate-900 text-base'>
                            {review?.comment}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProductReviews
