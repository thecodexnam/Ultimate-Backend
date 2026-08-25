import jwt from "jsonwebtoken";

// Keep the secret lookup consistent with the auth controller.
const getJwtSecret = () => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        console.warn("WARNING: JWT_SECRET environment variable is missing.");
    }
    return secret;
};

// Verify the session token before allowing access to protected routes.
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

        // Attach decoded user information to the request for later controllers.
        req.user = decoded;
        next();
    });
};
