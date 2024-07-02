const cloudinary = require("../config/cloudinary");

const uploadToCloudinary = async (imageFiles, cloudFolder) => {
    const uploadPromises = imageFiles.map(async (image) => {
        const b64 = Buffer.from(image.buffer).toString("base64");
        let dataURI = "data:" + image.mimetype + ";base64," + b64;
        const res = await cloudinary.uploader.upload(dataURI, {
            folder: `${cloudFolder}`
        });
        return res.secure_url;
    });

    const imageUrls = await Promise.all(uploadPromises);
    return imageUrls;
};

const deleteFromCloudinary = async (imageUrls, cloudFolder) => {
    const publicIds = imageUrls.map(url => {
        const parts = url.split('/');
        const publicIdWithExtension = parts.slice(-1)[0];
        const publicId = publicIdWithExtension.split(".")[0];
        return publicId;
    });

    const deletePromises = publicIds.map(publicId => cloudinary.uploader.destroy(`${cloudFolder}/${publicId}`));
    await Promise.all(deletePromises);
};

module.exports = {
    uploadToCloudinary,
    deleteFromCloudinary
}