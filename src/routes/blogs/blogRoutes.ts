import {Request, Response, Router} from "express";
import {db, errorsArray} from "../../db/db";
import {blogRepository} from "../../repositories/blog-repository";
import {
    descriptionValidator,
    nameValidator,
    websiteUrlValidator
} from "../../validator/blogValidator";
import {authMiddleware} from "../../../middlewares/authMiddleware";


export const blogRoutes = Router()

    .get('/', (req: Request, res: Response) => {
        res.status(200).send(blogRepository.findBlog()
        )
    })

    .get('/:id', nameValidator, (req: Request, res: Response) => {
        const blog = blogRepository.findBlogById(req.params.id)
        if (blog) {
            res.status(200).send(blog)
            return
        }
        res.sendStatus(404)
    })

    .post('/', authMiddleware, websiteUrlValidator, descriptionValidator, nameValidator, (req: Request, res: Response) => {
        const errors = errorsArray(req)
        if (errors.length) {
            res.status(400).send({errorsMessages: errors})
            return;
        }
        res.status(201).send(blogRepository.createBlog(req.body))
        return
    })

    .put('/:id', authMiddleware, websiteUrlValidator, descriptionValidator, websiteUrlValidator, nameValidator, (req: Request, res: Response) => {
        const updatedBlog = blogRepository.updateBlog(req.params.id, req.body)
        const errors = errorsArray(req)
        if (errors.length) {
            res.status(400).send({errorsMessages: errors})
            return
        }
        if (updatedBlog) {
            blogRepository.updateBlog(req.params.id, req.body)
            res.sendStatus(204)
            return;
        }
        res.sendStatus(404)
        return;
    })

    .delete('/:id', authMiddleware, (req: Request, res: Response) => {
        const blog = blogRepository.deleteById(req.params.id)
        if (blog) {
            res.sendStatus(204)
            return
        }
        res.sendStatus(404)
    })

blogRoutes.delete('/', (req: Request, res: Response) => {
    db.blogs = []
    db.posts = []
    res.sendStatus(204)
})