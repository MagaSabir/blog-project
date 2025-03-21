import {Router, Request, Response, NextFunction} from "express";
import {postRepository} from "../../repositories/post-repository";
import {
    blogIdValidator,
    contentValidator,
    shortDescriptionValidator,
    titleValidator
} from "../../validator/postValidator";
import {authMiddleware} from "../../../middlewares/authMiddleware";
import {errorsArray} from "../../db/db";


export const postsRoutes = Router()


postsRoutes
    .get('/', async (req: Request, res: Response) => {
        res.status(200).send(await postRepository.findPost())
    })
    .get('/:id', async (req: Request, res: Response) => {
        const post = await postRepository.findPostById(req.params.id)
        if (post) {
            res.status(200).send(post)
            return
        }
        res.sendStatus(404)
        return;
    })

    .delete('/:id', authMiddleware, async (req: Request, res: Response) => {
        const blog = await postRepository.deleteById(req.params.id)
        if (blog) {
            res.sendStatus(204)
            return
        }
        res.sendStatus(404)
    })

    .post('/', blogIdValidator, authMiddleware, titleValidator, shortDescriptionValidator, contentValidator, async (req: Request, res: Response,) => {
        const errors = errorsArray(req)
        if (errors.length) {
            res.status(400).send({errorsMessages: errors})
            return
        }
        res.status(201).send(await postRepository.createPost(req.body))
        return

    })


    .put('/:id', authMiddleware, titleValidator, shortDescriptionValidator, contentValidator, blogIdValidator, async (req: Request, res: Response) => {
        const updatedPost = await postRepository.updatePost(req.params.id, req.body)
        const errors = errorsArray(req)
        if (errors.length) {
            res.status(400).send({errorsMessages: errors})
            return;
        }
        if (updatedPost) {
            await postRepository.updatePost(req.params.id, req.body)
            res.sendStatus(204)
            return
        }
        res.sendStatus(404)

    })