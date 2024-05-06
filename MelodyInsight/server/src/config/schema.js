const mongoose = require('mongoose');

const schemas = {
    USER: {
        name: String,
        username: String,
        email: String,
        password: String,
    },
};

const userModel = mongoose.model('User', mongoose.Schema(schemas.USER));

module.exports = { schemas, userModel };