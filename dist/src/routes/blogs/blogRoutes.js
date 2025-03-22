"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogRoutes = void 0;
const express_1 = require("express");
const db_1 = require("../../db/db");
const blog_repository_1 = require("../../repositories/blog-repository");
const blogValidator_1 = require("../../validator/blogValidator");
const authMiddleware_1 = require("../../../middlewares/authMiddleware");
exports.blogRoutes = (0, express_1.Router)()
    .get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).send(yield blog_repository_1.blogRepository.findAllBlogs());
}))
    .get('/:id', blogValidator_1.nameValidator, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield blog_repository_1.blogRepository.findBlogById(req.params.id);
    if (blog) {
        res.status(200).send(blog);
        return;
    }
    else {
        res.sendStatus(404);
    }
}))
    .post('/', authMiddleware_1.authMiddleware, blogValidator_1.websiteUrlValidator, blogValidator_1.descriptionValidator, blogValidator_1.nameValidator, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, db_1.errorsArray)(req);
    if (errors.length) {
        res.status(400).send({ errorsMessages: errors });
        return;
    }
    res.status(201).send(yield blog_repository_1.blogRepository.createBlog(req.body));
    return;
}))
    .put('/:id', authMiddleware_1.authMiddleware, blogValidator_1.websiteUrlValidator, blogValidator_1.descriptionValidator, blogValidator_1.websiteUrlValidator, blogValidator_1.nameValidator, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedBlog = yield blog_repository_1.blogRepository.updateBlog(req.params.id, req.body);
    const errors = (0, db_1.errorsArray)(req);
    if (errors.length) {
        res.status(400).send({ errorsMessages: errors });
        return;
    }
    if (updatedBlog) {
        yield blog_repository_1.blogRepository.updateBlog(req.params.id, req.body);
        res.sendStatus(204);
        return;
    }
    res.sendStatus(404);
    return;
}))
    .delete('/:id', authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield blog_repository_1.blogRepository.deleteById(req.params.id);
    if (blog) {
        res.sendStatus(204);
        return;
    }
    res.sendStatus(404);
}));
