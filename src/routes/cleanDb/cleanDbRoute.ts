import {Router, Request, Response} from "express";
import {cleanDbRepository} from "../../repositories/cleanDb-repository";

export const cleanDbRoutes = Router()

    .delete('/', async (req: Request, res: Response) => {
        await cleanDbRepository.cleanAllDB()
        res.sendStatus(204)
    })