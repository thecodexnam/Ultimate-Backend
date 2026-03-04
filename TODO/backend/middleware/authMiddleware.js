import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

export const verifyJWTToken = (req, res, next) => {
    const token = req.cookies['token'];
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized: No token provided",
        });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
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
