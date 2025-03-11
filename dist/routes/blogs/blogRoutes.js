"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogRoutes = void 0;
const express_1 = require("express");
const db_1 = require("../../db/db");
const blog_repository_1 = require("../../repositories/blog-repository");
const blogValidator_1 = require("../../validator/blogValidator");
const express_validator_1 = require("express-validator");
exports.blogRoutes = (0, express_1.Router)();
exports.blogRoutes
    .get('/', (req, res) => {
    res.status(200).send(blog_repository_1.blogRepository.findBlog());
})
    .get('/:id', blogValidator_1.nameValidator, (req, res) => {
    const blog = blog_repository_1.blogRepository.findBlogById(req.params.id);
    if (blog) {
        res.status(200).send(blog);
    }
    else {
        res.sendStatus(404);
    }
})
    .post('/', blogValidator_1.nameValidator, blogValidator_1.descriptionValidator, blogValidator_1.websiteUrlValidator, (req, res) => {
    const error = (0, express_validator_1.validationResult)(req).formatWith(error => ({
        field: error.type,
        message: error.msg
    })).array({ onlyFirstError: true });
    if (error.length) {
        res.status(400).send({ errorMessages: error });
    }
    else {
        res.status(201).send(blog_repository_1.blogRepository.createBlog(req.body));
    }
})
    .put('/:id', blogValidator_1.nameValidator, blogValidator_1.descriptionValidator, blogValidator_1.websiteUrlValidator, (req, res) => {
    const error = (0, express_validator_1.validationResult)(req).formatWith(error => ({
        field: error.type,
        message: error.msg
    })).array({ onlyFirstError: true });
    if (error.length) {
        res.status(400).send({ errorMessages: error });
        return;
    }
    else {
        blog_repository_1.blogRepository.updateBlog(req.params.id, req.body);
        res.sendStatus(204);
    }
})
    .delete('/:id', (req, res) => {
    const blog = blog_repository_1.blogRepository.deleteById(req.params.id);
    if (blog) {
        res.sendStatus(204);
    }
    res.sendStatus(404);
});
exports.blogRoutes.delete('/', (req, res) => {
    db_1.db.blogs = [];
    db_1.db.posts = [];
    res.sendStatus(204);
});
