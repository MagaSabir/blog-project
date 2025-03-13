"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRoutes = void 0;
const express_1 = require("express");
const post_repository_1 = require("../../repositories/post-repository");
exports.postsRoutes = (0, express_1.Router)();
exports.postsRoutes
    .get('/', (req, res) => {
    res.status(200).send(post_repository_1.postRepository.findPost());
})
    .get('/:id', (req, res) => {
    const post = post_repository_1.postRepository.findPostById(req.params.id);
    if (post) {
        res.status(200).send(post);
    }
    else {
        res.sendStatus(404);
    }
});
