const { verify } = require('jsonwebtoken')

class TokenValidator {
    constructor(token_type) {
        this.token_type = token_type;
    }

    validateToken = (req, _, next) => {
        if (!req.cookies) {
            req.authenticated = false
            return next()
        }
        const access_token = req.cookies[this.token_type];
        if (!access_token) {
            req.authenticated = false
            return next()
        }

        try {
            const valid_token = verify(access_token, 'apseudocodeapproachwithc')
            if (valid_token) {
                req.authenticated = true
                return next()
            }
        } catch (err) {
            req.authenticated = false
            return next()
        }
    }
}

module.exports = TokenValidator;