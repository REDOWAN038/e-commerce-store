import axios from "axios"
import { useEffect, useState } from "react"
import { MdDelete } from "react-icons/md"
import { MdEdit } from "react-icons/md"

import { showToast } from "../../utils/toast"

const Categories = () => {
    const [categories, setCategories] = useState([])
    const [categoryName, setCategoryName] = useState("")
    const [slugName, setSlugName] = useState("")
    const [categoryButtonName, setCategoryButtonName] = useState("Create")

    const getAllCategories = async () => {
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_SERVER_URL}/api/v1/category`
            )

            if (res?.data?.success) {
                showToast("All Categories", "success")
                setCategories(res?.data?.payload?.categories)
            }
        } catch (error) {
            showToast(error?.response?.data?.message, "error")
        }
    }

    const handleCreate = async () => {
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/api/v1/admin/category`,
                {
                    name: categoryName,
                },
                { withCredentials: true }
            )

            if (res?.data?.success) {
                showToast(res?.data?.message, "success")
                window.location.reload()
            }
        } catch (error) {
            if (
                error?.response?.status === 403 ||
                error?.response?.status === 409
            ) {
                showToast(error?.response?.data?.message, "error")
            } else {
                showToast("something went wrong", "error")
            }
        }
    }

    const handleDelete = async (slug) => {
        const isConfirmed = window.confirm(
            "Are you sure you want to delete this category?"
        )
        if (isConfirmed) {
            try {
                const res = await axios.delete(
                    `${
                        import.meta.env.VITE_SERVER_URL
                    }/api/v1/admin/category/${slug}`,
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

    const handleUpdate = async () => {
        try {
            const res = await axios.put(
                `${
                    import.meta.env.VITE_SERVER_URL
                }/api/v1/admin/category/${slugName}`,
                {
                    name: categoryName,
                },
                { withCredentials: true }
            )

            if (res?.data?.success) {
                showToast(res?.data?.message, "success")
                window.location.reload()
            }
        } catch (error) {
            if (
                error?.response?.status === 403 ||
                error?.response?.status === 404 ||
                error?.response?.status === 409
            ) {
                showToast(error?.response?.data?.message, "error")
            } else {
                showToast("something went wrong", "error")
            }
        }
    }

    const handleEditInput = async (name, slug) => {
        setCategoryName(name)
        setSlugName(slug)
        setCategoryButtonName("Update")
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                await getAllCategories()
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <div className='flex items-center justify-center mb-12'>
                <input
                    type='text'
                    placeholder='Category Name'
                    className='input input-bordered w-full max-w-xs'
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                />
                <button
                    className='btn btn-active btn-primary ml-2'
                    onClick={
                        categoryButtonName === "create"
                            ? () => handleCreate()
                            : () => handleUpdate()
                    }
                >
                    {categoryButtonName}
                </button>
            </div>
            <div className='overflow-x-auto'>
                <h1 className='flex items-center justify-center text-xl mb-10'>
                    All Categories
                </h1>
                <table className='table'>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Category</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories?.map((category, idx) => (
                            <tr
                                key={idx}
                                className=' cursor-pointer hover:bg-gray-300'
                            >
                                <th>{idx + 1}</th>
                                <td>{category?.name}</td>
                                <td>
                                    <div className='flex gap-2'>
                                        <div
                                            className='tooltip'
                                            data-tip='edit'
                                        >
                                            <MdEdit
                                                className='cursor-pointer text-blue-600 w-5 h-5'
                                                onClick={() =>
                                                    handleEditInput(
                                                        category.name,
                                                        category.slug
                                                    )
                                                }
                                            />
                                        </div>
                                        <div
                                            className='tooltip'
                                            data-tip='delete'
                                        >
                                            <MdDelete
                                                className='cursor-pointer text-red-600 w-5 h-5'
                                                onClick={() =>
                                                    handleDelete(category.slug)
                                                }
                                            />
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Categories
