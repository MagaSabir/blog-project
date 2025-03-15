"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRoutes = void 0;
const express_1 = require("express");
const post_repository_1 = require("../../repositories/post-repository");
const express_validator_1 = require("express-validator");
const postValidator_1 = require("../../validator/postValidator");
const authMiddleware_1 = require("../../../middlewares/authMiddleware");
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
    .post('/', postValidator_1.titleValidator, authMiddleware_1.authMiddleware, postValidator_1.shortDescriptionValidator, postValidator_1.contentValidator, (req, res) => {
    const error = (0, express_validator_1.validationResult)(req).formatWith((e) => ({
        message: e.msg,
        field: e.path
    })).array({ onlyFirstError: true });
    if (error.length) {
        res.status(400).send({ errorsMessages: error });
    }
    res.status(201).send(post_repository_1.postRepository.createPost(req.body));
    return;
})
    .put('/:id', authMiddleware_1.authMiddleware, postValidator_1.titleValidator, postValidator_1.shortDescriptionValidator, postValidator_1.contentValidator, (req, res) => {
    const updatedPost = post_repository_1.postRepository.updatePost(req.params.id, req.body);
    const error = (0, express_validator_1.validationResult)(req).formatWith((e) => ({
        message: e.msg,
        field: e.path
    })).array({ onlyFirstError: true });
    if (error.length) {
        res.status(400).send({ errorsMessages: error });
        return;
    }
    if (updatedPost) {
        post_repository_1.postRepository.updatePost(req.params.id, req.body);
        res.sendStatus(204);
        return;
    }
    res.sendStatus(404);
});
