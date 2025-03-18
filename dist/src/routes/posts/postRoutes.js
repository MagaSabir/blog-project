"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRoutes = void 0;
const express_1 = require("express");
const post_repository_1 = require("../../repositories/post-repository");
const postValidator_1 = require("../../validator/postValidator");
const authMiddleware_1 = require("../../../middlewares/authMiddleware");
const db_1 = require("../../db/db");
exports.postsRoutes = (0, express_1.Router)();
exports.postsRoutes
    .get('/', (req, res) => {
    res.status(200).send(post_repository_1.postRepository.findPost());
})
    .get('/:id', (req, res) => {
    const post = post_repository_1.postRepository.findPostById(req.params.id);
    if (post) {
        res.status(200).send(post);
        return;
    }
    res.sendStatus(404);
    return;
})
    .delete('/:id', authMiddleware_1.authMiddleware, (req, res) => {
    const blog = post_repository_1.postRepository.deleteById(req.params.id);
    if (blog) {
        res.sendStatus(204);
    }
    res.sendStatus(404);
})
    .post('/', authMiddleware_1.authMiddleware, postValidator_1.titleValidator, postValidator_1.shortDescriptionValidator, postValidator_1.contentValidator, postValidator_1.blogIdValidator, (req, res) => {
    const errors = (0, db_1.errorsArray)(req);
    if (errors.length) {
        res.status(400).send({ errorsMessages: errors });
        return;
    }
    res.status(201).send(post_repository_1.postRepository.createPost(req.body));
    return;
})
    .put('/:id', authMiddleware_1.authMiddleware, postValidator_1.titleValidator, postValidator_1.shortDescriptionValidator, postValidator_1.contentValidator, postValidator_1.blogIdValidator, (req, res) => {
    const updatedPost = post_repository_1.postRepository.updatePost(req.params.id, req.body);
    const errors = (0, db_1.errorsArray)(req);
    if (errors.length) {
        res.status(400).send({ errorsMessages: errors });
        return;
    }
    if (updatedPost) {
        post_repository_1.postRepository.updatePost(req.params.id, req.body);
        res.sendStatus(204);
        return;
    }
    res.sendStatus(404);
});
