const routes = require('../config/route_config');
const UserService = require('../services/User.service');

const getService = (route) => {
    if (route === routes.USER_ROUTE) {
        return new UserService();
    }
    return null;
}

module.exports = getService;