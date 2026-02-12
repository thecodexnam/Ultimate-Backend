import jwt from "jsonwebtoken";

// ============================================
// CHECK AUTH MIDDLEWARE
// This function runs BEFORE protected routes to make sure the user is logged in.
// ============================================
export const checkAuth = (req, res, next) => {
    try {
        console.log("Cookies received:", req.cookies); // Debugging

        // 1️⃣ Get the token from the cookies
        const token = req.cookies.token;

        // 2️⃣ If there is no token, reject the request (User is not logged in)
        if (!token) {
            console.log("No token found in cookies");
            return res.status(401).json({ message: "User not authenticated" });
        }

        // 3️⃣ Verify the token using our secret key
        // This decodes the token back into data (userId)
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Token decoded:", decoded);

        // 4️⃣ Attach the User ID to the request object
        // This allows the next function (controller) to know WHICH user makes the request
        req.userId = decoded.userId || decoded.id;

        // 5️⃣ Move to the next function (the controller)
        next();
    } catch (error) {
        console.log("JWT Error:", error.message);

        return res.status(401).json({
            message: "Invalid or Expired Token"
        });
    }
};
