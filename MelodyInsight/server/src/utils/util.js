const daysToMilliSeconds = (days) => {
    return days * 60 * 60 * 24 * 1000
}

const responseMessage = (res, status, message) => {
    res.status(status).json({ success: status == 200 ? true : false, message });
}

module.exports = { daysToMilliSeconds, responseMessage };