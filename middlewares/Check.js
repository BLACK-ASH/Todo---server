const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

const check = (req, res, next) => {
    // Get token from the Authorization header
    const authHeader = req.headers.authorization;

    // Check if the Authorization header exists and starts with "Bearer "
    if (authHeader && authHeader.startsWith('Bearer ')) {
        // Extract the token from the "Bearer <token>" string
        const token = authHeader.split(' ')[1];

        try {
            // Verify the token using jwt and your secret key
            const decoded = jwt.verify(token, process.env.JWTSECRET);
            req.user = decoded; // Store the decoded user info in the request object
            next(); // Call next() to pass control to the next middleware function
        } catch (err) {
            return res.status(401).json({ message: "Token is not valid" });
        }
    } else {
        // If no token is found, deny access
        return res.status(401).json({ message: "No token, authorization denied" });
    }
}

module.exports = check;