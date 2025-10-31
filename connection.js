const mongoose = require('mongoose');

const handleConnectDB = async (url) => {
    await mongoose.connect(url);
}

module.exports = { handleConnectDB };