"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogRoutes = void 0;
const express_1 = require("express");
const db_1 = require("../../db/db");
const blog_repository_1 = require("../../repositories/blog-repository");
const blogValidator_1 = require("../../validator/blogValidator");
const authMiddleware_1 = require("../../../middlewares/authMiddleware");
exports.blogRoutes = (0, express_1.Router)()
    .get('/', (req, res) => {
    res.status(200).send(blog_repository_1.blogRepository.findBlog());
})
    .get('/:id', blogValidator_1.nameValidator, (req, res) => {
    const blog = blog_repository_1.blogRepository.findBlogById(req.params.id);
    if (blog) {
        res.status(200).send(blog);
        return;
    }
    res.sendStatus(404);
})
    .post('/', authMiddleware_1.authMiddleware, blogValidator_1.websiteUrlValidator, blogValidator_1.descriptionValidator, blogValidator_1.nameValidator, (req, res) => {
    const errors = (0, db_1.errorsArray)(req);
    if (errors.length) {
        res.status(400).send({ errorsMessages: errors });
        return;
    }
    res.status(201).send(blog_repository_1.blogRepository.createBlog(req.body));
    return;
})
    .put('/:id', authMiddleware_1.authMiddleware, blogValidator_1.websiteUrlValidator, blogValidator_1.descriptionValidator, blogValidator_1.websiteUrlValidator, blogValidator_1.nameValidator, (req, res) => {
    const updatedBlog = blog_repository_1.blogRepository.updateBlog(req.params.id, req.body);
    const errors = (0, db_1.errorsArray)(req);
    if (errors.length) {
        res.status(400).send({ errorsMessages: errors });
        return;
    }
    if (updatedBlog) {
        blog_repository_1.blogRepository.updateBlog(req.params.id, req.body);
        res.sendStatus(204);
        return;
    }
    res.sendStatus(404);
    return;
})
    .delete('/:id', authMiddleware_1.authMiddleware, (req, res) => {
    const blog = blog_repository_1.blogRepository.deleteById(req.params.id);
    if (blog) {
        res.sendStatus(204);
        return;
    }
    res.sendStatus(404);
});
exports.blogRoutes.delete('/', (req, res) => {
    db_1.db.blogs = [];
    db_1.db.posts = [];
    res.sendStatus(204);
});
