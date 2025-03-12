"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRepository = void 0;
const db_1 = require("../db/db");
exports.postRepository = {
    findPost() {
        return db_1.db.blogs;
    },
    findPostById(id) {
        const post = db_1.db.posts.find(v => v.id === id);
        return post;
    },
};
