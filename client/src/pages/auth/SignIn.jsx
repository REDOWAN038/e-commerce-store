import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import axios from "axios"
import { showToast } from "../../utils/toast"
import { useDispatch } from "react-redux"
import { login } from "../../features/auth/authSlice"

const SignIn = () => {
    const { register, handleSubmit } = useForm()

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const onSubmit = async (data) => {
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/api/v1/auth/login`,
                {
                    email: data.email,
                    password: data.password,
                },
                { withCredentials: true }
            )

            if (res?.data?.success) {
                dispatch(login(res?.data?.payload))
                showToast(res?.data?.message, "success")
                navigate("/")
            }
        } catch (error) {
            if (error?.response?.status === 404) {
                showToast(error?.response?.data?.message, "info")
                navigate("/signup")
            } else if (error?.response?.status === 401) {
                showToast(error?.response?.data?.message, "error")
            } else {
                showToast("something went wrong...", "error")
            }
        }
    }

    return (
        <div className='flex items-center justify-center'>
            <div className='card bg-base-100 shadow-2xl w-2/3 md:w-1/3'>
                <form className='card-body' onSubmit={handleSubmit(onSubmit)}>
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
                                to='/signup'
                                className='label-text-alt link link-hover'
                            >
                                Sign Up
                            </Link>
                        </label>
                    </div>
                    <div className='form-control mt-6'>
                        <button className='btn btn-primary'>Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignIn
