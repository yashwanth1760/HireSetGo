import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized", success: false }); // kick out if no token , no login 
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized", success: false }); 
        }
        req.id = decoded.id;  // created by login controller see  
        next();

    } catch (error) {
        
        return res.status(401).json({ message: "Unauthorized", success: false });

    }

}

export default isAuthenticated;

