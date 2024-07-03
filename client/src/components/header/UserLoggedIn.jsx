import { BsCart2 } from "react-icons/bs"
import { FaRegHeart } from "react-icons/fa6"
import { Link } from "react-router-dom"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { showToast } from "../../utils/toast"
import { logout } from "../../features/auth/authSlice"
import { useNavigate } from "react-router-dom"
import Person from "../../assets/person.jpg"
import { selectFavourites } from "../../features/favourites/selector"

const UserLoggedIn = () => {
    const dispatch = useDispatch()
    const favourites = useSelector(selectFavourites)
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/api/v1/auth/logout`,
                {},
                { withCredentials: true }
            )

            if (response?.data?.success) {
                dispatch(logout())
                showToast(response?.data?.message, "success")
                navigate("/signin")
            }
        } catch (error) {
            showToast("something went wrong...", "error")
        }
    }
    return (
        <div className='navbar bg-base-100 border-b fixed z-10'>
            <div className='flex-1'>
                <Link to='/' className='btn btn-ghost text-xl'>
                    Store
                </Link>
            </div>
            <div className='flex-none'>
                <div className='dropdown dropdown-end'>
                    <div
                        tabIndex={0}
                        role='button'
                        className='btn btn-ghost btn-circle'
                    >
                        <div className='indicator'>
                            {/* <Link to='/cart'> */}
                            <BsCart2 className='h-5 w-5' />
                            {/* </Link> */}
                            <span className='badge badge-sm indicator-item'>
                                8
                            </span>
                        </div>
                    </div>
                    <div
                        tabIndex={0}
                        className='card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow'
                    >
                        <div className='card-body'>
                            <span className='text-lg font-bold'>8 Items</span>
                            <span className='text-info'>Subtotal: $999</span>
                            <div className='card-actions'>
                                <button className='btn btn-primary btn-block'>
                                    View cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='dropdown dropdown-end'>
                    <div
                        tabIndex={0}
                        role='button'
                        className='btn btn-ghost btn-circle'
                    >
                        <div className='indicator'>
                            <Link to='/wishlist'>
                                <FaRegHeart className='h-5 w-5' />
                            </Link>
                            {favourites.length > 0 && (
                                <span className='badge badge-sm indicator-item'>
                                    {favourites.length}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
                <div className='dropdown dropdown-end'>
                    <div
                        tabIndex={0}
                        role='button'
                        className='btn btn-ghost btn-circle avatar'
                    >
                        <div className='w-10 rounded-full'>
                            <img
                                alt='Tailwind CSS Navbar component'
                                src={Person}
                            />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className='menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow'
                    >
                        <li>
                            <Link to='/profile'>Profile</Link>
                        </li>
                        <li>
                            <a onClick={() => handleLogout()}>Logout</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default UserLoggedIn
