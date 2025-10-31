const express = require('express');
const router = express.Router();
const Url = require('../models/url');
const USER_ROLES = require('../enums/userRole');
const { restrictTo } = require('../middlewares/auth');

router.get('/admin/urls', restrictTo([USER_ROLES.ADMIN]), async(req, res) => {
    const allUrls = await Url.find({});
    return res.render('home', { urls: allUrls });
});

router.get('/', restrictTo([USER_ROLES.NORMAL, USER_ROLES.ADMIN]), async(req, res) => {
    const allUrls = await Url.find(
        req.user.role === USER_ROLES.ADMIN
        ? {}
        : { createdBy: req.user._id }
    );
    return res.render('home', { urls: allUrls });
});

router.get('/signup', (req, res) => {
    return res.render('signup', { userRoles: USER_ROLES });
});

router.get('/login', (req, res) => {
    return res.render('login');
});

module.exports = router;