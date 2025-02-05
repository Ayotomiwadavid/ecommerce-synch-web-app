const jwt = require('jsonwebtoken');

const authenticate = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decode = jwt.verify(token, 'AzQ,PI)0(');

        req.user = decode
        next();
    } catch (error) {
        res.status(401).json({
            message: 'Authentication Failed'
        })
    }
}

module.exports = authenticate