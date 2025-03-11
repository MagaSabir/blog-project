import {Request, Response, Router} from "express";
import {db} from "../../db/db";
import {blogRepository} from "../../repositories/blog-repository";
import {
    descriptionValidator,
    nameValidator,
    websiteUrlValidator
} from "../../validator/blogValidator";
import {validationResult} from "express-validator";

export const blogRoutes = Router()

blogRoutes
  .get('/', (req: Request, res: Response) => {
    res.status(200).send(blogRepository.findBlog()
    )},
)
  .get('/:id',nameValidator, (req: Request, res: Response) => {
    const blog = blogRepository.findBlogById(req.params.id)
    if(blog) {
        res.status(200).send(blog)
    }
    else {
        res.sendStatus(404)
    }
})

.post('/', nameValidator, descriptionValidator, websiteUrlValidator, (req: Request, res: Response) => {
    const error = validationResult(req).formatWith(error => ({
            field: error.type,
            message: error.msg
    })).array({onlyFirstError: true})

    if(error.length) {
        res.status(400).send({errorMessages:error})
    }
    else {
        res.status(201).send(blogRepository.createBlog(req.body))
    }
})

.put('/:id',nameValidator, descriptionValidator, websiteUrlValidator, (req: Request, res: Response) => {
    const error = validationResult(req).formatWith(error => ({
        field: error.type,
        message: error.msg
    })).array({onlyFirstError: true})

    if(error.length) {
        res.status(400).send({errorMessages:error})
        return
    } else {
        blogRepository.updateBlog(req.params.id, req.body)
        res.sendStatus(204)
    }

})

.delete('/:id', (req:Request, res:Response) => {
    const blog = blogRepository.deleteById(req.params.id)
    if(blog) {
        res.sendStatus(204)
    }
    res.sendStatus(404)
})


blogRoutes.delete('/', (req: Request, res: Response) => {
    db.blogs = []
    db.posts = []
    res.sendStatus(204)
})