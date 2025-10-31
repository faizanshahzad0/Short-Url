const jwt = require('jsonwebtoken');
const SECRET_KEY = '@!!Faizan1234567890!!@';

const setUser = (user) => {
    const payload = {
        _id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '24h' });
    return token;
}

const getUser = (token) => {
    if(!token) return null;
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (error) {
        console.log('JWT verification failed:', error.message);
        return null;
    }
}

module.exports = { setUser, getUser };