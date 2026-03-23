// utils/uploadToCloudinary.js
const cloudinary = require("../config/cloudinary");

const uploadToCloudinary = (fileBuffer) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            {
                folder: "resumes",
                resource_type: "raw", // important for PDF/DOC
                use_filename: true,        // 👈 use original name
                unique_filename: true,    // 👈 don’t randomize
                format: "pdf",
            },
            (error, result) => {
                if (error) return reject(error);
                resolve(result);
            }
        ).end(fileBuffer);
    });
};

module.exports = uploadToCloudinary;