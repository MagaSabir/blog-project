"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const settings_1 = require("../src/settings");
const authMiddleware = (req, res, next) => {
    const auth = req.headers['authorization'];
    if (!auth) {
        res.sendStatus(401);
        return;
    }
    const [authType, token] = auth.split(' ');
    const [login, password] = settings_1.SETTINGS.ADMIN_AUTH.split(':');
    if (authType !== 'Basic') {
        res.sendStatus(401);
        return;
    }
    const adminToken = Buffer.from(token, 'base64').toString();
    const [tokenLogin, tokenPassword] = adminToken.split(':');
    if (login !== tokenLogin || password !== tokenPassword) {
        res.sendStatus(401);
        return;
    }
    next();
};
exports.authMiddleware = authMiddleware;
