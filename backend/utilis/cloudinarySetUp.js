import {v2 as cloudinary} from "cloudinary";

import dotenv from "dotenv";
dotenv.config({});

 cloudinary.config({ 
        cloud_name: process.env.CLOUD_NAME, 
        api_key: process.env.API_KEY_CLOUDINARY, 
        api_secret:  process.env.API_SECRET_CLOUDINARY  // Click 'View API Keys' above to copy your API secret
    });

    export default cloudinary;
    