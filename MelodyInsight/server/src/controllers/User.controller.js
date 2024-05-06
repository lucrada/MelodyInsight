const Authenticator = require('./Authenticator.controller');
const routes = require('../config/route_config');
const getService = require('../utils/service_factory');

class UserController extends Authenticator {
    constructor(token_duration = 3) {
        const service = getService(routes.USER_ROUTE);
        super('user-access-token', service, token_duration);
    }
}

module.exports = UserController;