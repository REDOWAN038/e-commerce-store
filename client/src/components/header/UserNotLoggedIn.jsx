import { BsCart2 } from "react-icons/bs"
import { FaRegHeart } from "react-icons/fa6"
import Person from "../../assets/person.jpg"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectFavourites } from "../../features/favourites/selector"
import Favourites from "../Favourites"

const UserNotLoggedIn = () => {
    const favourites = useSelector(selectFavourites)

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
                            <FaRegHeart className='h-5 w-5' />
                            {favourites.length > 0 && (
                                <span className='badge badge-sm indicator-item'>
                                    {favourites.length}
                                </span>
                            )}
                        </div>
                    </div>
                    {favourites.length > 0 ? (
                        <div
                            tabIndex={0}
                            className='card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-64 shadow'
                        >
                            <ul
                                tabIndex={0}
                                className='dropdown-content menu bg-base-100 z-[1] w-56 p-2 shadow overflow-y-auto'
                            >
                                {favourites.map((fav, idx) => (
                                    <li key={idx}>
                                        <Favourites fav={fav} />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : null}
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
                            <Link to='/signin'>Sign In</Link>
                        </li>
                        <li>
                            <Link to='/signup'>Sign Up</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default UserNotLoggedIn
