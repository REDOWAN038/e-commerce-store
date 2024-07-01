import axios from "axios"
import { useEffect, useState } from "react"
import { GiCheckMark } from "react-icons/gi"
import { FaXmark } from "react-icons/fa6"
import { MdDelete } from "react-icons/md"

import { showToast } from "../../utils/toast"

const UserLists = () => {
    const [users, setUsers] = useState([])

    const getAllUsers = async () => {
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_SERVER_URL}/api/v1/admin/users`,
                {
                    withCredentials: true,
                }
            )

            if (res?.data?.success) {
                showToast("All Users", "success")
                setUsers(res?.data?.payload?.users)
            }
        } catch (error) {
            showToast(error?.response?.data?.message, "error")
        }
    }

    const handleDelete = async (id) => {
        const isConfirmed = window.confirm(
            "Are you sure you want to delete this person?"
        )
        if (isConfirmed) {
            try {
                const res = await axios.delete(
                    `${
                        import.meta.env.VITE_SERVER_URL
                    }/api/v1/admin/users/${id}`,
                    { withCredentials: true }
                )

                if (res?.data?.success) {
                    showToast(res?.data?.message, "success")
                    window.location.reload()
                }
            } catch (error) {
                if (
                    error?.response?.status === 403 ||
                    error?.response?.status === 404
                ) {
                    showToast(error?.response?.data?.message, "error")
                } else {
                    showToast("something went wrong", "error")
                }
            }
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                await getAllUsers()
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className='overflow-x-auto'>
            <h1 className='flex items-center justify-center text-xl mb-10'>
                All Users
            </h1>
            <table className='table'>
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Admin</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users?.map((user, idx) => (
                        <tr
                            key={idx}
                            className=' cursor-pointer hover:bg-gray-300'
                        >
                            <th>{idx + 1}</th>
                            <td>{user?.name}</td>
                            <td>{user?.email}</td>
                            <td>
                                {user?.isAdmin ? (
                                    <GiCheckMark className='text-green-600' />
                                ) : (
                                    <FaXmark className='text-red-600' />
                                )}
                            </td>
                            <td>
                                {user?.isAdmin ? null : (
                                    <MdDelete
                                        className='cursor-pointer text-red-600 w-4 h-4'
                                        onClick={() => handleDelete(user._id)}
                                    />
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default UserLists
