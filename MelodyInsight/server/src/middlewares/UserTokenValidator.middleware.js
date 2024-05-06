const TokenValidator = require('./TokenValidator.middleware');

class UserTokenValidator extends TokenValidator {
    constructor() {
        super('user-access-token');
    }
}

module.exports = UserTokenValidator;