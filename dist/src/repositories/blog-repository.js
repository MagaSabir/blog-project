"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogRepository = void 0;
const db_1 = require("../db/db");
exports.blogRepository = {
    findBlog() {
        return db_1.db.blogs;
    },
    findBlogById(id) {
        let blog = db_1.db.blogs.find(v => v.id === id);
        return blog;
    },
    createBlog(req) {
        const newBlog = {
            id: Math.floor(Date.now() + Math.random()).toString(),
            name: req.name,
            description: req.description,
            websiteUrl: req.websiteUrl
        };
        db_1.db.blogs.push(newBlog);
        return newBlog;
    },
    updateBlog(id, req) {
        const index = db_1.db.blogs.findIndex(p => p.id === id);
        if (index !== -1) {
            db_1.db.blogs = db_1.db.blogs.map(el => el.id === id ? Object.assign(Object.assign({}, el), req) : el);
            return db_1.db.blogs[index];
        }
        return null;
    },
    deleteById(id) {
        const index = db_1.db.blogs.findIndex(v => v.id === id);
        if (index !== -1) {
            return db_1.db.blogs.splice(index, 1);
        }
        return null;
    }
};
