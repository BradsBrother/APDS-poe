const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({ error: "Access denied. No token provided." })
    }

    try {
        const verified = jwt.verify(token, process.env.SECRET_KEY)
        req.user = verified 
        next()
    } catch (error) {
        return res.status(403).json({ error: "Invalid token" })
    }
}

module.exports = requireAuth
