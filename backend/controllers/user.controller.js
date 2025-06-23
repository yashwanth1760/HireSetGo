import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getDataUri } from "../utilis/streamUpload.js";
import { uploadToCloudinary } from "../utilis/Cloudinary.js";
import cloudinary from "../utilis/cloudinarySetUp.js";
import DataURIParser from "datauri/parser.js";


// REGISTER
export const register = async (req, res) => {
    try {
        const { fullName, email, phoneNumber, password, role } = req.body;
        const file = req.files?.file?.[0];

         (file);     

        if (!fullName || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "Please fill in all fields",
                success: false,
            });
        }

        const result = getDataUri(file);
        const coloudResponse = await uploadToCloudinary(
            result.content,
                "image", // for profile image
                `profile-${Date.now()}`,
                "profiles"

        );


        const normalizedEmail = email.trim().toLowerCase();

        const existingUser = await User.findOne({ email: normalizedEmail });
        if (existingUser) {
            return res.status(400).json({
                message: "An account already exists with this email. Try logging in.",
                success: false,
            });
        }

        const existingPhoneUser = await User.findOne({ phoneNumber });
        if (existingPhoneUser) {
            return res.status(400).json({
                message: "This phone number is already registered. Try logging in.",
                success: false,
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            fullName,
            email: normalizedEmail,
            phoneNumber,
            password: hashedPassword,
            role,
            profile: {
                profilePhoto: coloudResponse.secure_url,
            }


        });

        return res.status(201).json({
            message: "User registered successfully",
            user,
            success: true,
        });
    } catch (error) {


        
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
        });
    }
};

// LOGIN
export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (
            !email?.trim() ||
            !password?.trim() ||
            !role?.trim()
        ) {
            return res.status(400).json({
                message: "Please fill in all fields",
                success: false,
            });
        }

        const normalizedEmail = email.trim().toLowerCase();

        const user = await User.findOne({ email: normalizedEmail });
        if (!user) {
            return res.status(400).json({
                message: "User not found. Check your email.",
                success: false,
            });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(400).json({
                message: "Invalid password",
                success: false,
            });
        }

        if (role !== user.role) {
            return res.status(400).json({
                message: "User does not exist with this role",
                success: false,
            });
        }

        // Generate JWT
        const tokenData = { id: user._id };
        const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
            expiresIn: "1d",
        });

        const userData = {
            id: user._id,
            fullName: user.fullName,
            phoneNumber: user.phoneNumber,
            email: user.email,
            role: user.role,
            profile: user.profile,
        };

        return res
            .status(200)
            .cookie("token", token, {
                maxAge: 24 * 60 * 60 * 1000, // 1 day
                httpOnly: true,
                sameSite: "strict",
            })
            .json({
                message: "Login successful",
                success: true,
                user: userData,
            });
    } catch (error) {
        
        return res.status(500).json({
            message: "Something went wrong during login",
            success: false,
        });
    }
};

// LOGOUT
export const logout = async (req, res) => {
    try {
        return res
            .status(200)
            .cookie("token", "", { maxAge: 0 })
            .json({
                message: "Logged out successfully",
                success: true,
            });
    } catch (error) {
        
        return res.status(500).json({
            message: "Something went wrong during logout",
            success: false,
        });
    }
};

// UPDATE PROFILE


export const updateProfile = async (req, res) => {
    try {
        const {
            fullName,
            phoneNumber,
            email,
            location,
            linkedin,
            bio,
            skills,
        } = req.body;

        const resumeFile = req.files?.resume?.[0];
        const profileFile = req.files?.profile?.[0];


         (resumeFile, profileFile);

        const userId = req.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        // 📝 Basic text fields
        if (fullName) user.fullName = fullName;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (email) user.email = email;
        if (bio) user.profile.bio = bio;
        if (location) user.profile.location = location;
        if (linkedin) user.profile.linkedin = linkedin;

        if (skills) {
            const skillsArray = skills.split(",").map((s) => s.trim());
            user.profile.skills = skillsArray;
        }

        // 📄 Upload resume (PDF or DOCX)
        if (resumeFile) {
            const fileUri = getDataUri(resumeFile);
            const result = await uploadToCloudinary(
                fileUri.content,
                "raw", // for PDF resume
                `resume-${Date.now()}`,
                "resumes"
            );
             (result);
            user.profile.resume = result.secure_url;
            user.profile.resumeOriginalName = resumeFile.originalname;
        }

        // 🖼️ Upload profile image (JPG, PNG, WebP)
        if (profileFile) {
            const fileUri = getDataUri(profileFile);
            const result = await uploadToCloudinary(
                fileUri.content,
                "image", // for profile image
                `profile-${Date.now()}`,
                "profiles"
            );
             (result);

            user.profile.profilePhoto = result.secure_url;
        }

        // ✅ Save user changes
        await user.save();

        return res.status(200).json({
            message: "Profile updated successfully",
            success: true,
            user: {
                id: user._id,
                fullName: user.fullName,
                phoneNumber: user.phoneNumber,
                email: user.email,
                role: user.role,
                profile: user.profile,
            },
        });
    } catch (error) {
        
        return res.status(500).json({
            message: "Something went wrong while updating profile",
            success: false,
        });
    }
};
