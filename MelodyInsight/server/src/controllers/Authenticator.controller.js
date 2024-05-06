const { daysToMilliSeconds, responseMessage } = require('../utils/util');
const bcrypt = require('bcrypt');
const { verify } = require('jsonwebtoken');
const { execute } = require('../model/model_handler');

class Authenticator {
    constructor(token_type, service, token_duration) {
        this.token_type = token_type;
        this.service = service;
        this.token_duration = token_duration;
    }

    loginController = async (req, res) => {
        if (req.authenticated) {
            responseMessage(res, 500, 'ALREADY_LOGGED_IN');
            return;
        }
        const credentials = req.body.credentials;
        if (!await this.service.usernameExists(credentials.username)) {
            responseMessage(res, 500, 'USERNAME_DOES_NOT_EXIST');
            return;
        }
        if (!await this.service.validateCredential(credentials)) {
            responseMessage(res, 500, 'INCORRECT_PASSWORD');
            return;
        }
        const member = await this.service.getMember(credentials.username);
        if (member == null) {
            responseMessage(res, 500, 'LOGIN_FAILED');
            return;
        }
        const token = this.service.createMemberToken(member);
        res.cookie(this.token_type, token, {
            maxAge: daysToMilliSeconds(this.token_duration),
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
        });
        responseMessage(res, 200, 'LOGGED_IN');
    }

    registerController = async (req, res) => {
        if (req.authenticated) {
            responseMessage(res, 500, 'ALREADY_LOGGED_IN');
            return;
        }
        const member = req.body.member;
        if (await this.service.usernameExists(member.username)) {
            responseMessage(res, 500, 'USERNAME_ALREADY_EXISTS');
            return;
        }
        const hashed_password = await bcrypt.hash(member.password, 10);
        if (await this.service.addMember(member, hashed_password)) {
            const token = this.service.createMemberToken(await this.service.getMember(member.username));
            res.cookie(this.token_type, token, {
                maxAge: daysToMilliSeconds(this.token_duration),
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
            })
            responseMessage(res, 200, 'REG_SUCCESS');
            return;
        }
        responseMessage(res, 500, 'REG_FAILED');
    }

    deleteController = async (req, res) => {
        if (!req.authenticated) {
            responseMessage(res, 500, 'NOT_AUTHENTICATED');
            return
        }
        const decoded_token = verify(req.cookies[this.token_type], process.env.SECRET_KEY);
        if (await this.service.removeMember(decoded_token.id)) {
            res.clearCookie(this.token_type);
            responseMessage(res, 200, 'REMOVED_SUCCESSFULLY');
            return
        }
        responseMessage(res, 500, 'REMOVAL_FAILED');
    }

    getIdController = (req, res) => {
        if (!req.authenticated) {
            responseMessage(res, 500, 'NOT_AUTHENTICATED');
            return
        }
        const decoded_token = verify(req.cookies[this.token_type], process.env.SECRET_KEY);
        responseMessage(res, 200, decoded_token.id);
    }

    getId = (req, res) => {
        if (!req.authenticated) {
            responseMessage(res, 500, 'NOT_AUTHENTICATED');
            return
        }
        const decoded_token = verify(req.cookies[this.token_type], process.env.SECRET_KEY);
        return decoded_token.id;
    }

    memberDataController = async (req, res) => {
        if (!req.authenticated) {
            responseMessage(res, 500, 'NOT_AUTHENTICATED');
            return;
        }
        const decoded_token = verify(req.cookies[this.token_type], process.env.SECRET_KEY);
        const memberData = await this.service.getMemberData(decoded_token.id);
        if (memberData == null) {
            responseMessage(res, 500, 'FETCHING_FAILED');
            return;
        }
        responseMessage(res, 200, memberData);
    }

    logoutController = async (req, res) => {
        if (!req.authenticated) {
            responseMessage(res, 500, 'ALREADY_LOGGED_OUT');
            return
        }
        res.clearCookie(this.token_type);
        responseMessage(res, 200, 'LOGGED_OUT');
    }

    authStatusController = (req, res) => {
        responseMessage(res, 200, req.authenticated ? 'LOGGED_IN' : 'LOGGED_OUT');
    }

    findMusicController = async (req, res) => {
        const lyrics = await execute();
        responseMessage(res, 200, lyrics);
    }
}

module.exports = Authenticator;