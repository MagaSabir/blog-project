import {Router, Request, Response, NextFunction} from "express";
import {postRepository} from "../../repositories/post-repository";
import {validationResult} from "express-validator";
import {contentValidator, shortDescriptionValidator, titleValidator} from "../../validator/postValidator";
import {authMiddleware} from "../../../middlewares/authMiddleware";


export const postsRoutes = Router()


postsRoutes
    .get('/', (req: Request, res: Response) => {
        res.status(200).send(postRepository.findPost())
    })
    .get('/:id', (req: Request, res: Response) => {
        const post = postRepository.findPostById(req.params.id)
        if (post) {
            res.status(200).send(post)
            return
        }
        res.sendStatus(404)
        return;
    })

    .delete('/:id', authMiddleware, (req: Request, res: Response) => {
        const blog = postRepository.deleteById(req.params.id)
        if (blog) {
            res.sendStatus(204)
        }
        res.sendStatus(404)
    })

    .post('/', titleValidator, authMiddleware, shortDescriptionValidator, contentValidator, (req: Request, res: Response) => {
        const error = validationResult(req).formatWith((e) => ({
            message: e.msg,
            field: e.path
        })).array({onlyFirstError: true})

        if (error.length) {
            res.status(400).send({errorsMessages: error})
        }

        res.status(201).send(postRepository.createPost(req.body,))
        return

    })

    .put('/:id', authMiddleware, titleValidator, shortDescriptionValidator, contentValidator, (req: Request, res: Response) => {
        const updatedPost = postRepository.updatePost(req.params.id, req.body)
        const error = validationResult(req).formatWith((e) => ({
            message: e.msg,
            field: e.path
        })).array({onlyFirstError: true})


        if (error.length) {
            res.status(400).send({errorsMessages: error})
            return;
        }
        if (updatedPost) {
            postRepository.updatePost(req.params.id, req.body)
            res.sendStatus(204)
            return
        }
        res.sendStatus(404)

    })