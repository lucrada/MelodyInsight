require('dotenv').config();
const mongoose = require('mongoose');
const { userModel } = require('./schema');

const connect = async () => {
    try {
        await mongoose.connect(`mongodb://127.0.0.1:27017/melody_insight`)
        console.log('connected to database');
    } catch (err) {
        console.log(err);
    }
}

const getModels = () => {
    return {
        User: userModel,
    }
}

module.exports = { getModels, connect };
