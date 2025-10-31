const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true,
    },
    redirectUrl: {
        type: String,
        required: true,
    },
    totalClicks: {
        type: String,
        required: true,
    },
    visitHistory: [{ 
        timestamp: { 
            type: Date, 
            default: Date.now 
        }, 
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
});

const Url = mongoose.model('url', urlSchema);

module.exports = Url;