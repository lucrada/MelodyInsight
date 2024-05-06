const routes = require('../config/route_config');
const UserController = require('../controllers/User.controller');

const getController = (route) => {
    if (route === routes.USER_ROUTE) {
        return new UserController();
    }
    return null;
}

module.exports = getController;