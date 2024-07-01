const slugify = require("slugify")
const createError = require("http-errors")

const categoryModel = require("../models/categoryModel")
const asyncHandler = require("../handler/asyncHandler")
const { successResponse } = require("../handler/responseHandler")

// create category
const handleCreateCategory = asyncHandler(async (req, res, next) => {
    const { name } = req.body
    const category = await categoryModel.findOne({ name })

    if (category) {
        next(createError(409, `${name} category is already available`))
    }

    await categoryModel.create({
        name,
        slug: slugify(name)
    })

    return successResponse(res, {
        statusCode: 201,
        message: "category created successfully",
    })
})

// get categories
const handleGetAllCategories = asyncHandler(async (req, res, next) => {
    const categories = await categoryModel.find({}).select("name slug").lean()
    return successResponse(res, {
        statusCode: 200,
        message: "categories fetched successfully",
        payload: {
            categories
        }
    })
})

// get category
const handleGetCategory = asyncHandler(async (req, res, next) => {

    const { slug } = req.params
    const category = await categoryModel.find({ slug }).select("name slug").lean()

    if (!category || category.length == 0) {
        next(createError(404, "no such category found"))
    }

    return successResponse(res, {
        statusCode: 200,
        message: "category fetched successfully",
        payload: {
            category
        }
    })
})

// update category
const handleUpdateCategory = asyncHandler(async (req, res, next) => {
    const { name } = req.body
    const { slug } = req.params
    const updates = { name, slug: slugify(name) }
    const options = { new: true }

    const updatedCategory = await categoryModel.findOneAndUpdate({ slug }, updates, options)

    if (!updatedCategory || updatedCategory.length == 0) {
        next(createError(404, "no such category found"))
    }

    return successResponse(res, {
        statusCode: 200,
        message: "category updated successfully",
    })
})

// delete category
const handleDeleteCategory = asyncHandler(async (req, res, next) => {
    const { slug } = req.params
    const category = await categoryModel.find({ slug })

    if (!category || category.length == 0) {
        next(createError(404, "no such category found"))
    }
    await categoryModel.findOneAndDelete({ slug })

    return successResponse(res, {
        statusCode: 200,
        message: "category deleted successfully",
    })
})

module.exports = {
    handleCreateCategory,
    handleGetAllCategories,
    handleGetCategory,
    handleUpdateCategory,
    handleDeleteCategory
}