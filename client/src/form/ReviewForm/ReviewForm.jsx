import { useForm } from "react-hook-form"
import { useState } from "react"
import axios from "axios"
import { showToast } from "../../utils/toast"
import GiveRating from "../../components/GiveRating"
import { useSelector } from "react-redux"
import { selectUser } from "../../features/auth/selector"
import { Link, useParams } from "react-router-dom"

const ReviewForm = () => {
    const user = useSelector(selectUser)
    const { slug } = useParams()
    const [rating, setRating] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        try {
            setIsLoading(true)
            const reviewData = { ...data, rating }
            const res = await axios.post(
                `${
                    import.meta.env.VITE_SERVER_URL
                }/api/v1/product/review/${slug}`,
                {
                    comment: reviewData.comment,
                    rating: reviewData.rating,
                },
                { withCredentials: true }
            )

            if (res?.data?.success) {
                setIsLoading(false)
                window.location.reload()
            }
        } catch (error) {
            setIsLoading(false)
            if (
                error?.response?.status === 404 ||
                error?.response?.status === 403
            ) {
                showToast(error?.response?.data?.message, "error")
            } else {
                showToast("something went wrong...", "error")
            }
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
            <div className='flex items-center space-x-4'>
                <label htmlFor='comment' className='font-medium'>
                    Comment
                </label>
                <textarea
                    id='comment'
                    {...register("comment", { required: true })}
                    className='border rounded px-2 py-1'
                ></textarea>
                {errors.comment && (
                    <span className='text-red-500'>Comment is required</span>
                )}
            </div>

            <div className='flex items-center space-x-4'>
                <label className='font-medium'>Rating</label>
                <GiveRating onClick={setRating} rating={rating} />
            </div>

            {user ? (
                <button
                    type='submit'
                    className='btn btn-primary btn-sm'
                    disabled={isLoading}
                >
                    {isLoading ? "Please Wait..." : "Submit"}
                </button>
            ) : (
                <Link to='/signin'>
                    <button
                        type='submit'
                        className='btn btn-primary btn-sm mt-4'
                    >
                        Please Sign In
                    </button>
                </Link>
            )}
        </form>
    )
}

export default ReviewForm
