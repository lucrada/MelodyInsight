const routes = require('../config/route_config');
const UserTokenValidator = require('../middlewares/UserTokenValidator.middleware');

const getTokenValidator = (route) => {
    if (route === routes.USER_ROUTE) {
        return new UserTokenValidator();
    }
    return null;
}

module.exports = getTokenValidator;