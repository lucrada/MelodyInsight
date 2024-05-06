const AuthService = require("./Authenticator.service");
const { getModels } = require('../config/db_config');

class UserService extends AuthService {
    constructor() {
        const models = getModels();
        super(models.User);
    }
}

module.exports = UserService;