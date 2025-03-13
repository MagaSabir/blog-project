"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRepository = void 0;
const db_1 = require("../db/db");
exports.postRepository = {
    findPost() {
        return db_1.db.posts;
    },
    findPostById(id) {
        const post = db_1.db.posts.find(v => v.id === id);
        return post;
    },
    createPost(req) {
        let idbl = db_1.db.blogs.map(el => el.id);
        let blogName = db_1.db.blogs.map(el => el.name);
        // let blogName = db.blogs.find((el) => el.id === idbl[idbl.length - 1])
        const newPost = {
            id: Math.floor(Date.now() + Math.random()).toString(),
            title: req.title,
            shortDescription: req.shortDescription,
            content: req.content,
            blogId: idbl.at(-1).toString(),
            blogName: blogName.at(-1).toString()
        };
        console.log(idbl.toString());
        db_1.db.posts.push(newPost);
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
        let blogId = db_1.db.blogs.map(el => el.id);
        let blogName = db_1.db.blogs.find((el) => el.id === blogId[blogId.length - 1]);
        const index = db_1.db.posts.findIndex(p => p.id === id);
        if (index !== -1) {
            db_1.db.posts = db_1.db.posts.map(el => el.id === id ? Object.assign(Object.assign(Object.assign({}, el), req), { blogName: blogName === null || blogName === void 0 ? void 0 : blogName.name }) : el);
            return db_1.db.posts[index];
        }
        return null;
    }
};
