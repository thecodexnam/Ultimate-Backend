import jwt from "jsonwebtoken";

export const checkAuth = (req, res, next) => {
    try {
        console.log("Cookies received:", req.cookies); // Debugging
        const token = req.cookies.token;

        if (!token) {
            console.log("No token found in cookies");
            return res.status(401).json({ message: "User not authenticated" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Token decoded:", decoded);

        req.userId = decoded.userId || decoded.id;

        next();
    } catch (error) {
        console.log("JWT Error:", error.message);

        return res.status(401).json({
            message: "Invalid or Expired Token"
        });
    }
};
