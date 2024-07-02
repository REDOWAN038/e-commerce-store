import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import axios from "axios"
import { showToast } from "../../utils/toast"

const ProductForm = ({
    product = null,
    onSave,
    isLoading,
    setIsLoading,
    method,
}) => {
    const {
        register,
        watch,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm()

    const [categories, setCategories] = useState([])
    const existingImageUrls = watch("images")

    const getAllCategories = async () => {
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_SERVER_URL}/api/v1/category`
            )

            if (res?.data?.success) {
                setCategories(res?.data?.payload?.categories)
            }
        } catch (error) {
            showToast("something went wrong...", "error")
        }
    }

    const onSubmit = async (productData) => {
        try {
            setIsLoading(true)
            const formData = new FormData()

            formData.append("name", productData.name)
            formData.append("brand", productData.brand)
            formData.append("description", productData.description)
            formData.append("price", productData.price.toString())
            formData.append("quantity", productData.quantity.toString())
            if (method === "Add") {
                formData.append("category", productData.category)
            }

            if (productData.images) {
                productData.images.forEach((url, index) => {
                    formData.append(`images[${index}]`, url)
                })
            }

            Array.from(productData.imageFiles).forEach((imageFile) => {
                formData.append(`imageFiles`, imageFile)
            })

            await onSave(formData)
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = (e, imageUrl) => {
        e.preventDefault()
        const isConfirmed = window.confirm(
            "Are you sure you want to delete this image?"
        )

        if (isConfirmed) {
            setValue(
                "images",
                existingImageUrls.filter((url) => url !== imageUrl)
            )
        }
    }

    useEffect(() => {
        reset(product)
    }, [product, reset])

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
        <div className='flex items-center justify-center'>
            <form
                className='flex flex-col gap-10 mx-2'
                onSubmit={handleSubmit(onSubmit)}
            >
                <h1 className='flex justify-center text-3xl'>{`${method} Product`}</h1>
                <div className='flex flex-col sm:flex-row gap-4'>
                    <div className='w-full'>
                        <label className='label'>
                            <span className='label-text'>Product Name</span>
                        </label>
                        <input
                            type='text'
                            placeholder='Product Name'
                            className='input input-bordered w-full'
                            required
                            {...register("name")}
                        />
                    </div>
                    <div className='w-full'>
                        <label className='label'>
                            <span className='label-text'>Product Brand</span>
                        </label>
                        <input
                            type='text'
                            placeholder='Product Brand'
                            className='input input-bordered w-full'
                            required
                            {...register("brand")}
                        />
                    </div>
                </div>
                <div className='flex gap-4'>
                    <div className='w-full'>
                        <label className='label'>
                            <span className='label-text'>Price</span>
                        </label>
                        <input
                            type='number'
                            className='input input-bordered w-full'
                            min={1}
                            required
                            {...register("price")}
                        />
                    </div>
                    <div className='w-full'>
                        <label className='label'>
                            <span className='label-text'>Quantity</span>
                        </label>
                        <input
                            type='number'
                            className='input input-bordered w-full'
                            min={1}
                            required
                            {...register("quantity")}
                        />
                    </div>
                </div>
                <div>
                    <label className='label'>
                        <span className='label-text'>Product Description</span>
                    </label>
                    <textarea
                        placeholder='type here...'
                        className='textarea textarea-bordered textarea-lg w-full'
                        required
                        {...register("description")}
                    ></textarea>
                </div>
                <div className='w-full'>
                    <label className='label'>
                        <span className='label-text'>Product Category</span>
                    </label>

                    {product ? (
                        <select className='select select-bordered w-full max-w-xs'>
                            <option value={product?.category?._id}>
                                {product?.category?.name}
                            </option>
                        </select>
                    ) : (
                        <select
                            className='select select-bordered w-full max-w-xs'
                            required
                        >
                            {categories?.map((category, idx) => (
                                <option key={idx} value={category._id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    )}
                </div>
                <div>
                    <label className='label'>
                        <span className='label-text'>Product Images</span>
                    </label>
                    <div className='border rounded p-4 flex flex-col gap-4'>
                        {existingImageUrls && (
                            <div className='grid grid-cols-6 gap-4'>
                                {existingImageUrls.map((url, idx) => (
                                    <div key={idx} className='relative group'>
                                        <img
                                            src={url}
                                            className='min-h-full object-cover'
                                        />
                                        <button
                                            onClick={(e) =>
                                                handleDelete(e, url)
                                            }
                                            className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 text-white'
                                        >
                                            Delete
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                        <input
                            type='file'
                            multiple
                            accept='image/*'
                            className='w-full text-gray-700 font-normal'
                            {...register("imageFiles", {
                                validate: (imageFiles) => {
                                    const totalLength =
                                        imageFiles.length +
                                        (existingImageUrls?.length || 0)

                                    if (totalLength === 0) {
                                        return "At least one image should be added"
                                    }

                                    if (totalLength > 6) {
                                        return "Total number of images cannot be more than 6"
                                    }

                                    return true
                                },
                            })}
                        />
                    </div>
                    {errors.imageFiles && (
                        <span className='text-red-500 text-sm font-bold'>
                            {errors.imageFiles.message}
                        </span>
                    )}
                </div>
                <div className='flex items-center justify-center'>
                    <button className='btn btn-primary' disabled={isLoading}>
                        {isLoading ? "Please Wait..." : `${method} Product`}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ProductForm
