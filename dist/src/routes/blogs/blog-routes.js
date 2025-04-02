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
const blog_validations_1 = require("../../validator/blog-validations");
const authMiddleware_1 = require("../../../middlewares/authMiddleware");
const blogs_service_1 = require("../../domain/blogs-service");
const post_validations_1 = require("../../validator/post-validations");
const posts_service_1 = require("../../domain/posts-service");
exports.blogRoutes = (0, express_1.Router)()
    .get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pageNumber = req.query.pageNumber ? +req.query.pageNumber : 1;
    const pageSize = req.query.pageSize ? +req.query.pageSize : 10;
    const sortDirection = req.query.sortDirection === 'asc' ? 1 : -1;
    const searchNameTerm = req.query.searchNameTerm;
    const { total, post } = yield blogs_service_1.blogsService.findAllBlogsPagination(pageNumber, pageSize, sortDirection, searchNameTerm);
    res.status(200).json({
        pagesCount: Math.ceil(total / pageSize),
        pageNumber,
        pageSize: pageSize,
        total,
        items: post
    });
}))
    .get('/:id', blog_validations_1.nameValidator, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield blogs_service_1.blogsService.findBlogById(req.params.id);
    if (blog) {
        res.status(200).send(blog);
        return;
    }
    else {
        res.sendStatus(404);
    }
}))
    .post('/:id/posts', authMiddleware_1.authMiddleware, post_validations_1.titleValidator, post_validations_1.shortDescriptionValidator, post_validations_1.contentValidator, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, db_1.errorsArray)(req);
    if (errors.length) {
        res.status(400).send({ errorsMessages: errors });
        return;
    }
    res.status(201).send(yield posts_service_1.postsService.createPost(req.body, req.params));
    return;
}))
    .post('/', authMiddleware_1.authMiddleware, blog_validations_1.websiteUrlValidator, blog_validations_1.descriptionValidator, blog_validations_1.nameValidator, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, db_1.errorsArray)(req);
    if (errors.length) {
        res.status(400).send({ errorsMessages: errors });
        return;
    }
    res.status(201).send(yield blogs_service_1.blogsService.createBlog(req.body));
    return;
}))
    .put('/:id', authMiddleware_1.authMiddleware, blog_validations_1.websiteUrlValidator, blog_validations_1.descriptionValidator, blog_validations_1.nameValidator, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, db_1.errorsArray)(req);
    if (errors.length) {
        res.status(400).send({ errorsMessages: errors });
        return;
    }
    const updatedBlog = yield blogs_service_1.blogsService.updateBlog(req.params.id, req.body);
    if (updatedBlog) {
        res.sendStatus(204);
        return;
    }
    res.sendStatus(404);
    return;
}))
    .delete('/:id', authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield blogs_service_1.blogsService.deleteById(req.params.id);
    if (blog) {
        res.sendStatus(204);
        return;
    }
    res.sendStatus(404);
}));
