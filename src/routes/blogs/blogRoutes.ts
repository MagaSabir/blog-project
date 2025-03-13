import {Request, Response, Router} from "express";
import {db} from "../../db/db";
import {blogRepository} from "../../repositories/blog-repository";
import {
    descriptionValidator,
    nameValidator,
    websiteUrlValidator
} from "../../validator/blogValidator";
import {validationResult} from "express-validator";
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
        } else {
            res.sendStatus(404)
        }
    })

    .post('/', authMiddleware, websiteUrlValidator, descriptionValidator, nameValidator, (req: Request, res: Response) => {

        const error = validationResult(req).formatWith((e) => ({
            message: e.msg,
            field: e.path,
        })).array({onlyFirstError: true})

        if (error.length) {
            res.status(400).send({errorMessages: error})
            return;
        } else {
            res.status(201).send(blogRepository.createBlog(req.body))
            return
        }

    })

    .put('/:id', authMiddleware, websiteUrlValidator, descriptionValidator, websiteUrlValidator, nameValidator, (req: Request, res: Response) => {
        const updatedBlog = blogRepository.updateBlog(req.params.id, req.body)
        const error = validationResult(req).formatWith((e) => ({
            message: e.msg,
            field: e.path,
        })).array({onlyFirstError: true})
        if (error.length) {
            res.status(400).send({errorMessages: error})
            return
        }

        if (updatedBlog) {
            blogRepository.updateBlog(req.params.id, req.body)
            res.sendStatus(204)
            return;
        } else {
            res.sendStatus(404)
            return;
        }

    })

    .delete('/:id', authMiddleware, (req: Request, res: Response) => {
        const blog = blogRepository.deleteById(req.params.id)
        if (blog) {
            res.sendStatus(204)
        }
        res.sendStatus(404)
    })

blogRoutes.delete('/', (req: Request, res: Response) => {
    db.blogs = []
    db.posts = []
    res.sendStatus(204)
})