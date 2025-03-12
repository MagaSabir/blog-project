import {Router, Request, Response} from "express";
import {postRepository} from "../../repositories/post-repository";
import {validationResult} from "express-validator";
import {contentValidator, shortDescriptionValidator, titleValidator} from "../../validator/postValidator";

export const postsRoutes = Router()

postsRoutes
    .get('/',  (req:Request, res: Response) => {
        res.status(200).send(postRepository.findPost())
    })
    .get('/:id', (req:Request, res:Response) => {
        const post = postRepository.findPostById(req.params.id)
        if(post) {
            res.status(200).send(post)
        }
        else {
            res.sendStatus(404)
        }
    })

    .delete('/:id', (req:Request, res:Response) => {
        const blog = postRepository.deleteById(req.params.id)
        if(blog) {
            res.sendStatus(204)
        }
        res.sendStatus(404)
    })

    .post('/',titleValidator, shortDescriptionValidator, contentValidator, (req:Request, res:Response) => {
        const error = validationResult(req).formatWith((e) => ({
            field: e.type,
            message: e.msg
        })).array({onlyFirstError:true})

        if(error.length) {
            res.status(400).send({errorMessages: error})
        } else {
            postRepository.createPost(req.body)
            res.sendStatus(201)
        }
    })

    .put('/:id', titleValidator, shortDescriptionValidator, contentValidator, (req: Request, res: Response) => {
        const error = validationResult(req).formatWith((e) => ({
            field: e.type,
            message: e.msg
        })).array({onlyFirstError: true})

        if(error.length) {
            res.status(400).send({errorMessage: error})
        } else {
            postRepository.updatePost(req.params.id, req.body)
            res.sendStatus(204)
        }
    })