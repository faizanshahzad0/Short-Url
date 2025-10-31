const { nanoid } = require('nanoid');
const Url = require('../models/url'); 

const handleGenerateNewShortUrl = async (req, res) => {
    const body = req.body;
    if (!body.url) return res.status(400).json({ status: 'failed', error: 'url is required' });
    const shortId = nanoid(8);
    await Url.create({ shortId: shortId, redirectUrl: req.body.url, totalClicks: 0, visitHistory: [], createdBy: req.user._id });
    return res.render('home', { shortId: shortId });
}

const handleGetAnalytics = async (req, res) => {
    const shortId = req.params.shortId;
    const result = await Url.findOne({ shortId });
    return res.json({ totalClicks: result.visitHistory.length, analytics: result.visitHistory });
}

module.exports = { handleGenerateNewShortUrl, handleGetAnalytics };