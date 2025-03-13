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
export let blogId: string
export let blogName: string
blogRoutes

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

    .post('/', authMiddleware, nameValidator, descriptionValidator, websiteUrlValidator, (req: Request, res: Response) => {
        const error = validationResult(req).formatWith((error) => ({
            field: error.type,
            message: error.msg,
        })).array({onlyFirstError: true})

        if (error.length) {
            res.status(400).send({errorMessages: error})
            return;
        } else {
            blogRepository.createBlog(req.body)
            res.sendStatus(201)
            return
        }
        blogId = blogRepository.createBlog(req.body).id
        blogName = blogRepository.createBlog(req.body).name
    })

    .put('/:id', authMiddleware, nameValidator, descriptionValidator, websiteUrlValidator, (req: Request, res: Response) => {
        const error = validationResult(req).formatWith(error => ({
            field: error.type,
            message: error.msg
        })).array({onlyFirstError: true})

        if (error.length) {
            res.status(400).send({errorMessages: error})
            return
        } else {
            blogRepository.updateBlog(req.params.id, req.body)
            res.sendStatus(204)
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