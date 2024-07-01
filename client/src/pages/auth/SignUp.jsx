import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import axios from "axios"
import { showToast } from "../../utils/toast"

const SignUp = () => {
    const { register, handleSubmit } = useForm()

    const navigate = useNavigate()

    const onSubmit = async (data) => {
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/api/v1/users/register`,
                {
                    name: data.name,
                    email: data.email,
                    password: data.password,
                },
                { withCredentials: true }
            )

            if (res?.data?.success) {
                showToast(res?.data?.message, "success")
                navigate("/signin")
            }
        } catch (error) {
            if (error?.response?.status === 409) {
                showToast(error?.response?.data?.message, "info")
                navigate("/signin")
            } else {
                showToast("something went wrong...", "error")
            }
        }
    }

    return (
        <div className='flex items-center justify-center'>
            <div className='card bg-base-100 shadow-2xl w-2/3 lg:w-1/3'>
                <h1 className='flex justify-center mt-5 text-3xl'>Sign Up</h1>
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
                            required
                            {...register("email")}
                        />
                    </div>
                    <div className='form-control'>
                        <label className='label'>
                            <span className='label-text'>Password</span>
                        </label>
                        <input
                            type='password'
                            placeholder='password'
                            className='input input-bordered'
                            required
                            {...register("password")}
                        />
                        <label className='label'>
                            <Link
                                to='/signin'
                                className='label-text-alt link link-hover'
                            >
                                Sign In
                            </Link>
                        </label>
                    </div>
                    <div className='form-control mt-6'>
                        <button className='btn btn-primary'>Register</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp
