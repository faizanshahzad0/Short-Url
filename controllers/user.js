const User = require('../models/users');
const {v4: uuidv4} = require('uuid');
const { setUser } = require('../service/auth');

const handleUserSignup = async (req, res) => {
    const {name, email, password, role} = req.body;
    if (!name || !email || !password || !role) {
        return res.status(400).json({ status: 'failed', error: 'All fields are required' });
    }
    const user = await User.create({ name, email, password ,role});
    return res.redirect('/');
    // return res.status(201).json({ status: 'success', message: 'User created successfully', user: user });
}

const handleUserLogin = async (req, res) => {
    const {email, password} = req.body;
    if (!email || !password) {
        return res.status(400).json({ status: 'failed', error: 'All fields are required' });
    }
    const user = await User.findOne({ email });
    if (!user) {
        // return res.status(400).json({ status: 'failed', error: 'User not found' });
        return res.render('login', { error: 'Invalid email or password' });
    }
    if (user.password !== password) {
        // return res.status(400).json({ status: 'failed', error: 'Invalid password' });
        return res.render('login', { error: 'Invalid email or password' });
    }
    const token = setUser(user);
    res.cookie('token', token);
    return res.redirect('/');
    // return res.json({ status: 'success', message: 'Login successful', token: token });
}

module.exports = { handleUserSignup, handleUserLogin };