const multer = require("multer")


const storage = multer.memoryStorage()

const fileFilter = (req, file, cb) => {
    if (!(file.mimetype.startsWith("image/"))) {
        return cb(new Error("only image file is required"), false)
    }

    cb(null, true)
}

const limits = {
    fileSize: 1024 * 1024 * 5 // Limit file size to 5 MB
};

const upload = multer({
    storage: storage,
    limits: limits,
    fileFilter: fileFilter
})

module.exports = {
    upload
}