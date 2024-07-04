import { useForm } from "react-hook-form"
import { useState } from "react"
import axios from "axios"
import { showToast } from "../../utils/toast"
import GiveRating from "../../components/GiveRating"

const ReviewForm = () => {
    const [rating, setRating] = useState(0)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        const reviewData = { ...data, rating }
        console.log("data ", reviewData)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
            <div className='flex items-center space-x-2'>
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

            <div className='flex items-center space-x-2'>
                <label className='font-medium'>Rating</label>
                <GiveRating onClick={setRating} rating={rating} />
            </div>

            <button type='submit' className='btn btn-primary'>
                Submit
            </button>
        </form>
    )
}

export default ReviewForm
