"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRepository = void 0;
const db_1 = require("../db/db");
const blogRoutes_1 = require("../routes/blogs/blogRoutes");
exports.postRepository = {
    findPost() {
        return db_1.db.posts;
    },
    findPostById(id) {
        const post = db_1.db.posts.find(v => v.id === id);
        return post;
    },
    createPost(req) {
        const newPost = {
            id: Math.floor(Date.now() + Math.random()).toString(),
            title: req.title,
            shortDescription: req.shortDescription,
            content: req.content,
            blogId: blogRoutes_1.blogId,
            blogName: blogRoutes_1.blogName
        };
        db_1.db.posts.push(newPost);
        console.log(blogRoutes_1.blogId);
        return newPost;
    },
    deleteById(id) {
        const index = db_1.db.posts.findIndex(v => v.id === id);
        if (index !== -1) {
            return db_1.db.posts.splice(index, 1);
        }
        return null;
    },
    updatePost(id, req) {
        db_1.db.posts = db_1.db.posts.map(p => {
            if (p.id === id) {
                p.title = req.title;
                p.shortDescription = req.shortDescription;
                p.content = req.content;
                p.blogId = blogRoutes_1.blogId;
            }
            return p;
        });
    }
};
