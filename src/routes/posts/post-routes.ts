import {Router, Request, Response, NextFunction} from "express";
import {postRepository} from "../../repositories/post-repository";
import {
    blogIdValidator,
    contentValidator,
    shortDescriptionValidator,
    titleValidator
} from "../../validator/post-validations";
import {authMiddleware} from "../../../middlewares/authMiddleware";
import {errorsArray, postType} from "../../db/db";
import {postsService} from "../../domain/posts-service";
import {client} from "../../db/mongodb";
import {body} from "express-validator";
import {blogsService} from "../../domain/blogs-service";


export const postsRoutes = Router()


postsRoutes
    .get('/', async (req: Request, res: Response) => {
        const pageNumber = req.query.pageNumber ? +req.query.pageNumber : 1
        const pageSize = req.query.pageSize ? +req.query.pageSize : 10
        const sortDirection = req.query.sortDirection === 'asc' ? 1 : -1
        const {
            total,
            post
        } = await postsService.getPosts(pageNumber, pageSize, sortDirection)

        res.status(200).json({
            pagesCount: Math.ceil(total / pageSize),
            page:pageNumber,
            pageSize: pageSize,
            totalCount:total,
            items: post
        })

    })
    .get('/:id', async (req: Request, res: Response) => {
        const post = await postsService.getPostById(req.params.id)
        if (post) {
            res.status(200).send(post)
            return
        }
        res.sendStatus(404)
        return;
    })

    .delete('/:id', authMiddleware, async (req: Request, res: Response) => {
        const blog = await postsService.deletePostById(req.params.id)
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
        res.status(201).send(await postsService.createPost(req.body))
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
            await postsService.updatePost(req.params.id, req.body)
            res.sendStatus(204)
            return
        }
        res.sendStatus(404)

    })