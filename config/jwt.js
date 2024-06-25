const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    return jwt.sign({ userId: user._id }, 'your-jwt-secret', { expiresIn: '1h' });
};

const verifyToken = (token) => {
    return jwt.verify(token, 'your-jwt-secret');
};

module.exports = { generateToken, verifyToken };
