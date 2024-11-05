const jwt = require("jsonwebtoken")

exports.verifyToken = (req, res, next) => {
    const token = req.headers["authorization"]?.split(' ')[1] //Séparer Bearer du Token

    if (!token) {
        return res.status(403).json({ error: 'Token missing' })
    }

    jwt.verify(token, process.env.KEYCRYPT, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Invalid or expired token' })
        }
      
        req.user = decoded
        next()
    })
}
