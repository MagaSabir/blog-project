import {Request, Response, Router} from "express";
import {db, errorsArray} from "../../db/db";
import {blogRepository} from "../../repositories/blog-repository";
import {
    descriptionValidator,
    nameValidator,
    websiteUrlValidator
} from "../../validator/blog-validations";
import {authMiddleware} from "../../../middlewares/authMiddleware";
import {blogsService} from "../../domain/blogs-service";


export const blogRoutes = Router()

    .get('/', async (req: Request, res: Response) => {
        res.status(200).send(await blogsService.findBlogs()
        )
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

    .put('/:id', authMiddleware, websiteUrlValidator, descriptionValidator, websiteUrlValidator, nameValidator, async (req: Request, res: Response) => {
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

