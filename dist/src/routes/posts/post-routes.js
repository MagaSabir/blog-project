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
exports.postsRoutes = void 0;
const express_1 = require("express");
const post_repository_1 = require("../../repositories/post-repository");
const post_validations_1 = require("../../validator/post-validations");
const authMiddleware_1 = require("../../../middlewares/authMiddleware");
const db_1 = require("../../db/db");
const posts_service_1 = require("../../domain/posts-service");
exports.postsRoutes = (0, express_1.Router)();
exports.postsRoutes
    .get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = req.query.page ? +req.query.page : 1;
    const limit = req.query.limit ? +req.query.limit : 10;
    const sortDirection = req.query.sortDirection === 'asc' ? 1 : -1;
    const { total, post } = yield posts_service_1.postsService.getPosts(page, limit, sortDirection);
    res.status(200).json({
        pagesCount: Math.ceil(total / limit),
        page,
        pageSize: limit,
        total,
        items: post
    });
}))
    .get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield posts_service_1.postsService.getPostById(req.params.id);
    if (post) {
        res.status(200).send(post);
        return;
    }
    res.sendStatus(404);
    return;
}))
    .delete('/:id', authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield posts_service_1.postsService.deletePostById(req.params.id);
    if (blog) {
        res.sendStatus(204);
        return;
    }
    res.sendStatus(404);
}))
    .post('/', post_validations_1.blogIdValidator, authMiddleware_1.authMiddleware, post_validations_1.titleValidator, post_validations_1.shortDescriptionValidator, post_validations_1.contentValidator, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, db_1.errorsArray)(req);
    if (errors.length) {
        res.status(400).send({ errorsMessages: errors });
        return;
    }
    res.status(201).send(yield posts_service_1.postsService.createPost(req.body));
    return;
}))
    .put('/:id', authMiddleware_1.authMiddleware, post_validations_1.titleValidator, post_validations_1.shortDescriptionValidator, post_validations_1.contentValidator, post_validations_1.blogIdValidator, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedPost = yield post_repository_1.postRepository.updatePost(req.params.id, req.body);
    const errors = (0, db_1.errorsArray)(req);
    if (errors.length) {
        res.status(400).send({ errorsMessages: errors });
        return;
    }
    if (updatedPost) {
        yield posts_service_1.postsService.updatePost(req.params.id, req.body);
        res.sendStatus(204);
        return;
    }
    res.sendStatus(404);
}));
