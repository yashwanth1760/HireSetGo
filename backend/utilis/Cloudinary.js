// utils/cloudinaryUploader.js
import cloudinary from "./cloudinarySetUp.js";

/**
 * Uploads a file to Cloudinary.
 *
 * @param {string} fileUri - The base64 or buffer URI string.
 * @param {string} fileType - 'raw' for PDF/doc, 'image' for photos.
 * @param {string} publicId - Unique name for the file.
 * @param {string} folder - Optional Cloudinary folder.
 */
export const uploadToCloudinary = (fileUri, fileType, publicId, folder = "") => {
    return cloudinary.uploader.upload(fileUri, {
        resource_type: fileType, // 'image' or 'raw'
        public_id: `${folder}/${publicId}`,
        folder,
    });
};
