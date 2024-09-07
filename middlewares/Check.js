const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

const check = (req, res, next) => {

    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWTSECRET);  // Replace with your actual secret key
        req.user = decoded;  // Add the decoded user information to the request
        next();
    } catch (err) {
        return res.status(401).json({ message: "Token is not valid" });
    }
}

module.exports = check;