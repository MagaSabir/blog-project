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
const postValidator_1 = require("../../validator/postValidator");
const authMiddleware_1 = require("../../../middlewares/authMiddleware");
const db_1 = require("../../db/db");
exports.postsRoutes = (0, express_1.Router)();
exports.postsRoutes
    .get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).send(yield post_repository_1.postRepository.getPosts());
}))
    .get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield post_repository_1.postRepository.getPostsById(req.params.id);
    if (post) {
        res.status(200).send(post);
        return;
    }
    res.sendStatus(404);
    return;
}))
    .delete('/:id', authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield post_repository_1.postRepository.deleteById(req.params.id);
    if (blog) {
        res.sendStatus(204);
        return;
    }
    res.sendStatus(404);
}))
    .post('/', postValidator_1.blogIdValidator, authMiddleware_1.authMiddleware, postValidator_1.titleValidator, postValidator_1.shortDescriptionValidator, postValidator_1.contentValidator, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, db_1.errorsArray)(req);
    if (errors.length) {
        res.status(400).send({ errorsMessages: errors });
        return;
    }
    res.status(201).send(yield post_repository_1.postRepository.createPost(req.body));
    return;
}))
    .put('/:id', authMiddleware_1.authMiddleware, postValidator_1.titleValidator, postValidator_1.shortDescriptionValidator, postValidator_1.contentValidator, postValidator_1.blogIdValidator, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedPost = yield post_repository_1.postRepository.updatePost(req.params.id, req.body);
    const errors = (0, db_1.errorsArray)(req);
    if (errors.length) {
        res.status(400).send({ errorsMessages: errors });
        return;
    }
    if (updatedPost) {
        yield post_repository_1.postRepository.updatePost(req.params.id, req.body);
        res.sendStatus(204);
        return;
    }
    res.sendStatus(404);
}));
