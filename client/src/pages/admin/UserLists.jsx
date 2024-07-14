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
        <div className='flex flex-col gap-8 mt-10 w-11/12 lg:w-9/12 h-[400px] mx-auto'>
            <div className='w-full flex flex-col items-center overflow-y-auto'>
                <h1 className='mt-10 mb-10 text-lg font-bold'>All Users</h1>
                <div className='flex flex-col bg-white shadow-lg w-full gap-6 px-10 py-5 h-fit rounded-lg'>
                    <div className='overflow-x-auto'>
                        <table className='w-full'>
                            <thead className='border-b-2'>
                                <tr>
                                    <th className='p-2 text-center whitespace-nowrap'></th>
                                    <th className='p-2 text-center whitespace-nowrap'>
                                        Name
                                    </th>
                                    <th className='p-2 text-center whitespace-nowrap'>
                                        Email
                                    </th>
                                    <th className='p-2 text-center whitespace-nowrap'>
                                        Admin
                                    </th>
                                    <th className='p-2 text-center whitespace-nowrap'>
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {users?.map((user, idx) => (
                                    <tr
                                        key={idx}
                                        className=' cursor-pointer hover:bg-gray-300'
                                    >
                                        <th className='p-2 text-center whitespace-nowrap'>
                                            {idx + 1}
                                        </th>
                                        <td className='p-2 text-center whitespace-nowrap'>
                                            {user?.name}
                                        </td>
                                        <td className='p-2 text-center whitespace-nowrap'>
                                            {user?.email}
                                        </td>
                                        <td className='p-2 text-center whitespace-nowrap'>
                                            <div className='flex justify-center'>
                                                {user?.isAdmin ? (
                                                    <GiCheckMark className='text-green-600 w-4 h-4' />
                                                ) : (
                                                    <FaXmark className='text-red-600 w-5 h-5' />
                                                )}
                                            </div>
                                        </td>
                                        <td className='p-2 text-center whitespace-nowrap'>
                                            {user?.isAdmin ? null : (
                                                <div
                                                    className='tooltip'
                                                    data-tip='delete'
                                                >
                                                    <MdDelete
                                                        className='cursor-pointer text-red-600 w-5 h-5'
                                                        onClick={() =>
                                                            handleDelete(
                                                                user._id
                                                            )
                                                        }
                                                    />
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserLists
