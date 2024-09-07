const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

const signUser = (data) => {
    const token = jwt.sign(data,process.env.JWTSECRET,{expiresIn:"1h"});
    return token
}

module.exports = signUser;