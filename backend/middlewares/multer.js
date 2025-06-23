import multer from "multer";

const storage = multer.memoryStorage(); // Use buffer instead of disk

export const multiUpload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // Max 5MB
    },
}).fields([
    { name: "profile", maxCount: 1 },
    { name: "resume", maxCount: 1 }, 
    { name: "file", maxCount: 1 }, 
    { name: "logo", maxCount: 1 }, 
]);
