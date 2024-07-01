import { useForm } from "react-hook-form"
import { useEffect } from "react"

const UserForm = ({ user, onSave, isLoading, setIsLoading }) => {
    const {
        register,
        watch,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    const onSubmit = async (userData) => {
        try {
            setIsLoading(true)
            let updatedData = {}
            if (userData.name.trim() !== "") {
                updatedData.name = userData.name
            }
            if (userData.password.trim() !== "") {
                updatedData.password = userData.password
            }

            await onSave(updatedData)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        reset(user)
    }, [user, reset])

    return (
        <div className='flex items-center justify-center'>
            <div className='card bg-base-100 shadow-2xl w-2/3 lg:w-1/3'>
                <h1 className='flex justify-center mt-5 text-3xl'>
                    Update Profile
                </h1>
                <form className='card-body' onSubmit={handleSubmit(onSubmit)}>
                    <div className='form-control'>
                        <label className='label'>
                            <span className='label-text'>Full Name</span>
                        </label>
                        <input
                            type='text'
                            placeholder='full name'
                            className='input input-bordered'
                            required
                            {...register("name")}
                        />
                    </div>
                    <div className='form-control'>
                        <label className='label'>
                            <span className='label-text'>Email</span>
                        </label>
                        <input
                            type='email'
                            placeholder='email'
                            className='input input-bordered'
                            {...register("email")}
                            disabled
                        />
                    </div>
                    <div className='form-control'>
                        <label className='label'>
                            <span className='label-text'>New Password</span>
                        </label>
                        <input
                            type='password'
                            placeholder='new password'
                            className='input input-bordered'
                            {...register("password")}
                        />
                    </div>
                    <div className='form-control'>
                        <label className='label'>
                            <span className='label-text'>
                                Confirm New Password
                            </span>
                        </label>
                        <input
                            type='password'
                            placeholder='confirm new password'
                            className='input input-bordered'
                            {...register("confirmPassword", {
                                validate: (val) => {
                                    if (watch("password") !== val) {
                                        return "Your passwords do not match"
                                    }
                                },
                            })}
                        />
                        {errors.confirmPassword && (
                            <span className='text-red-500'>
                                {errors.confirmPassword.message}
                            </span>
                        )}
                    </div>
                    <div className='form-control mt-6'>
                        <button
                            disabled={isLoading}
                            className='btn btn-primary'
                        >
                            {isLoading ? "Please Wait..." : "Update"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UserForm
