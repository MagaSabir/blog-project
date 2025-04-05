import {Request, Response, NextFunction} from "express";
import {SETTINGS} from "../src/settings";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const auth = req.headers['authorization']

    if (!auth) {
        res.sendStatus(401)
        return
    }

    const [authType, token] = auth.split(' ')
    const [login, password] = SETTINGS.ADMIN_AUTH.split(':')
    if (authType !== 'Basic') {
        res.sendStatus(401)
        return;
    }
    const adminToken = Buffer.from(token, 'base64').toString()
    const [tokenToLogin, tokenToPassword] = adminToken.split(':')
    if (login !== tokenToLogin || password !== tokenToPassword) {
        res.sendStatus(401)
        return;
    }
    next()
}