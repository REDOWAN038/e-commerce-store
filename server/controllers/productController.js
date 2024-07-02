const slugify = require("slugify")
const createError = require("http-errors")

const productModel = require("../models/productModel")
const asyncHandler = require("../handler/asyncHandler")
const { successResponse } = require("../handler/responseHandler")
const { uploadToCloudinary, deleteFromCloudinary } = require("../handler/cloudinary")
const { cloudFolder } = require("../src/secret")
const { constructQuery } = require("../handler/constructQuery")

// create product
const handleCreateProduct = asyncHandler(async (req, res, next) => {
    const imageFiles = req.files
    const { name, brand, category, description, price, quantity } = req.body

    const existingProduct = await productModel.find({ slug: slugify(name) })
    if (existingProduct.length !== 0) {
        return next(createError(409, "product already exists"))
    }

    const images = await uploadToCloudinary(imageFiles, cloudFolder);
    const product = await productModel.create({
        name,
        brand,
        slug: slugify(name),
        category,
        description,
        price,
        quantity,
        images
    })

    if (!product) {
        return next(createError("Something Went Wrong..."))
    }

    return successResponse(res, {
        statusCode: 201,
        message: "product created successfully",
        payload: {
            product
        }
    })
})

// get all products
const handleGetAllProducts = asyncHandler(async (req, res, next) => {
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 6
    const query = constructQuery(req.query)

    const products = await productModel
        .find(query)
        .populate("category")
        .limit(limit)
        .skip((page - 1) * limit)
        .sort({ createdAt: -1 })

    if (!products || products.length === 0) {
        return next(createError(404, "no products found"))
    }

    const totalProducts = await productModel.find(query).countDocuments()

    return successResponse(res, {
        statusCode: 200,
        message: "fetched all products",
        payload: {
            products,
            pagination: {
                totalProducts,
                totalPages: Math.ceil(totalProducts / limit),
                currentPage: page,
                previousPage: page - 1 > 0 ? page - 1 : null,
                nextPage: page + 1 <= Math.ceil(totalProducts / limit) ? page + 1 : null
            }
        }
    })
})

// get top products
const handleGetTopProducts = asyncHandler(async (req, res, next) => {
    const products = await productModel.find({}).sort({ rating: -1 }).limit(4)
    return successResponse(res, {
        statusCode: 200,
        message: "fetched top products",
        payload: {
            products,
        }
    })
})

// get new products
const handleGetNewProducts = asyncHandler(async (req, res, next) => {
    const products = await productModel.find({}).sort({ createdAt: -1 }).limit(5)
    return successResponse(res, {
        statusCode: 200,
        message: "fetched new products",
        payload: {
            products,
        }
    })
})

// get single product
const hanldeGetSingleProduct = asyncHandler(async (req, res, next) => {
    const { slug } = req.params
    const product = await productModel
        .findOne({ slug })
        .populate("category")


    if (!product || product.length === 0) {
        return next(createError(404, "no product found"))
    }

    return successResponse(res, {
        statusCode: 200,
        message: "product returned successfully",
        payload: {
            product
        }
    })
})

// update product
const handleUpdateProduct = asyncHandler(async (req, res, next) => {
    const { slug } = req.params
    const imageFiles = req.files

    const updateOptions = { new: true, runValidators: true, context: 'query' }
    let updates = {}
    const allowedFields = ['description', 'price', 'quantity', 'brand', 'sold', 'category']

    for (let key in req.body) {
        if (allowedFields.includes(key)) {
            updates[key] = req.body[key]
        } else if (['name'].includes(key)) {
            updates[key] = req.body[key]
            updates["slug"] = slugify(req.body[key])
        }
    }

    const product = await productModel.find({ slug })
    const deletedImageUrls = product[0].images.filter(item => !req.body?.images.includes(item));
    await deleteFromCloudinary(deletedImageUrls, cloudFolder);

    const updatedImageUrls = await uploadToCloudinary(imageFiles, cloudFolder)
    updates.images = ([...updatedImageUrls, ...(req.body?.images || [])])

    const updatedProduct = await productModel.findOneAndUpdate(
        { slug },
        updates,
        updateOptions
    )

    return successResponse(res, {
        statusCode: 200,
        message: "product updated successfully",
        payload: {
            updatedProduct
        }
    })
})

// delete product
const handleDeleteProduct = asyncHandler(async (req, res, next) => {
    const { slug } = req.params
    const product = await productModel.findOne({ slug })

    if (!product) {
        return next(createError(404, "no product found"))
    }

    await deleteFromCloudinary(product.images, cloudFolder);
    await productModel.deleteOne({ slug })

    return successResponse(res, {
        statusCode: 200,
        message: "product deleted successfully",
    })
})

// add review
const handleAddReview = asyncHandler(async (req, res, next) => {
    const { rating, comment } = req.body;
    const { slug } = req.params
    const product = await productModel.findOne({ slug })

    if (!product || product.length === 0) {
        return next(createError(404, "no product found"))
    }

    const alreadyReviewed = product.reviews.find(
        (review) => review.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
        return next(createError(403, "Already Reviewed"))
    }

    const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
    };

    product.reviews.push(review);
    product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

    await product.save();

    return successResponse(res, {
        statusCode: 201,
        message: "review added successfully",
    })
})

module.exports = {
    handleCreateProduct,
    handleUpdateProduct,
    handleDeleteProduct,
    handleGetAllProducts,
    hanldeGetSingleProduct,
    handleAddReview,
    handleGetTopProducts,
    handleGetNewProducts
}