import {NextFunction, Request, Response} from "express";
import {SETTINGS} from "../src/settings";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const auth = req.headers['authorization'] as string // 'Basic xxxx'
    console.log(auth)
    if (!auth) {
        res
            .status(401)
            .json({})
        return
    }
    const buff = Buffer.from(auth.slice(6), 'base64')
    console.log(buff)
    const decodedAuth = buff.toString('utf8')
    console.log(decodedAuth)

    const buff2 = Buffer.from(SETTINGS.ADMIN_AUTH, 'utf8')
    const codedAuth = buff2.toString('base64')

    // if (decodedAuth === ADMIN_AUTH || auth.slice(0, 5) !== 'Basic ') {
    if (auth.slice(6) !== codedAuth || auth.slice(0, 5) !== 'Basic ') {
        res
            .status(401)
            .json({})
        return
    }

    next()
}