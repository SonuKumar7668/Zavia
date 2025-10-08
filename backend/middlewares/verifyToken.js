const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
    console.log("verifying token...");
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        console.log(" Token verified:", decoded);
        next();
    } catch (e) {
        console.error(" JWT Error:",e);
        res.status(400).json({token: false, msg: 'Token is not valid ch' });
    }
}
module.exports = verifyToken;