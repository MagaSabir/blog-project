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

    .get('/', async (req: Request, res: Response) => {
        res.status(200).send(await blogRepository.findBlog()
        )
    })

    .get('/:id', nameValidator, async (req: Request, res: Response) => {
        const blog = await blogRepository.findBlogById(req.params.id)
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
        res.status(201).send(await blogRepository.createBlog(req.body))
        return
    })

    .put('/:id', authMiddleware, websiteUrlValidator, descriptionValidator, websiteUrlValidator, nameValidator, async (req: Request, res: Response) => {
        const updatedBlog = await blogRepository.updateBlog(req.params.id, req.body)
        const errors = errorsArray(req)
        if (errors.length) {
            res.status(400).send({errorsMessages: errors})
            return
        }
        if (updatedBlog) {
            await blogRepository.updateBlog(req.params.id, req.body)
            res.sendStatus(204)
            return;
        }
        res.sendStatus(404)
        return;
    })

    .delete('/:id', authMiddleware, async (req: Request, res: Response) => {
        const blog = await blogRepository.deleteById(req.params.id)
        if (blog) {
            res.sendStatus(204)
            return
        }
        res.sendStatus(404)
    })
    .delete('/', authMiddleware, async (req: Request, res: Response) => {
        const blog = await blogRepository.cleanBlogsDB()
        res.sendStatus(204)
    })

// blogRoutes.delete('/', async (req: Request, res: Response) => {
//     db.blogs = []
//     db.posts = []
//     res.sendStatus(204)
// })