const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const token = req.header('x-auth-token')

    if (!token) {
        res.status(401).json({
            msg: "Token not found Access Denied"
        })
    }

    // Verify Token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded.user
        next()
    } catch (error) {
        res.status(401).json({ msg: "Token is not valid" })
    }
}

module.exports = verifyToken