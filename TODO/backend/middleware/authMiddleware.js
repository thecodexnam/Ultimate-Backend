import jwt from "jsonwebtoken";

const getJwtSecret = () => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        console.warn("WARNING: JWT_SECRET environment variable is missing.");
    }
    return secret;
};

export const verifyJWTToken = (req, res, next) => {
    const token = req.cookies['token'];
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized: No token provided",
        });
    }

    jwt.verify(token, getJwtSecret(), (err, decoded) => {
        if (err) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: Invalid token",
            });
        }
        req.user = decoded; // Attach decoded user info to request
        next();
    });
};
