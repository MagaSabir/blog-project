import {Request, Response, Router} from "express";
import {errorsArray} from "../../db/db";

import {
    descriptionValidator,
    nameValidator,
    websiteUrlValidator
} from "../../validator/blog-validations";
import {authMiddleware} from "../../../middlewares/authMiddleware";
import {blogsService} from "../../domain/blogs-service";
import {
    contentValidator,
    shortDescriptionValidator,
    titleValidator
} from "../../validator/post-validations";


export const blogRoutes = Router()

    .get('/', async (req: Request, res: Response) => {
        const pageNumber = req.query.pageNumber ? +req.query.pageNumber : 1
        const pageSize = req.query.pageSize ? +req.query.pageSize : 10
        const sortDirection = req.query.sortDirection === 'asc' ? 1 : -1
        const searchNameTerm = req.query.searchNameTerm
        const sortBy = req.query.sortBy || 'createdAt'
        const {
            totalCount,
            items
        } = await blogsService.findAllBlogsPagination(pageNumber, pageSize, sortDirection, sortBy, searchNameTerm)

        res.status(200).json({
            pagesCount: Math.ceil(totalCount / pageSize),
            page: pageNumber,
            pageSize,
            totalCount,
            items
        })
    })


    .get('/:id', nameValidator, async (req: Request, res: Response) => {
        const blog = await blogsService.findBlogById(req.params.id)
        if (blog) {
            res.status(200).send(blog)
            return
        } else {
            res.sendStatus(404)
        }
    })


    .post('/', authMiddleware, websiteUrlValidator, descriptionValidator, nameValidator, async (req: Request, res: Response) => {
        const errors = errorsArray(req)
        if (errors.length) {
            res.status(400).send({errorsMessages: errors})
            return;
        }
        res.status(201).send(await blogsService.createBlog(req.body))
        return
    })


    .put('/:id', authMiddleware, websiteUrlValidator, descriptionValidator, nameValidator, async (req: Request, res: Response) => {
        const errors = errorsArray(req)
        if (errors.length) {
            res.status(400).send({errorsMessages: errors})
            return
        }
        const updatedBlog = await blogsService.updateBlog(req.params.id, req.body)
        if (updatedBlog) {
            res.sendStatus(204)
            return;
        }
        res.sendStatus(404)
        return;
    })

    .delete('/:id', authMiddleware, async (req: Request, res: Response) => {
        const blog = await blogsService.deleteById(req.params.id)
        if (blog) {
            res.sendStatus(204)
            return
        }
        res.sendStatus(404)
    })


    .post('/:id/posts', authMiddleware, titleValidator, shortDescriptionValidator, contentValidator, async (req: Request, res: Response): Promise<void> => {
        const errors = errorsArray(req)
        if (errors.length) {
            res.status(400).send({errorsMessages: errors})
            return
        }
        const blogId = req.params.id as string

        const blog = await blogsService.findBlogById(blogId)

        if (!blog) {
            res.sendStatus(404)
            return
        }

        const post = await blogsService.createPostByBlogId(req.body, req.params)

        res.status(201).send(post)
        return
    })

    .get('/:id/posts', async (req: Request, res: Response) => {
        const id = req.params.id
        const pageNumber = req.query.pageNumber ? +req.query.pageNumber : 1
        const pageSize = req.query.pageSize ? +req.query.pageSize : 10
        const sortDirection = req.query.sortDirection === 'asc' ? 1 : -1
        const sortBy = req.query.sortBy || 'createdAt'
        const {post, total} = await blogsService.getPostsByBlogId(id, pageNumber, pageSize, sortDirection, sortBy)

        if (!post.length) {
            res.sendStatus(404)
            console.log(post)
            return
        }
        res.status(200).json({
            pagesCount: Math.ceil(total / pageSize),
            page: pageNumber,
            pageSize: pageSize,
            totalCount: total,
            items: post
        })

    })



