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
        // const blog = db.blogs.find(v => v.id === id)
        // if(blog) {
        //     blog.id
        // }
        db_1.db.blogs.map(b => {
            if (b.id === id) {
                b.name = req.name;
                b.description = req.description;
                b.websiteUrl = req.websiteUrl;
            }
            return b;
        });
    },
    deleteById(id) {
        const index = db_1.db.blogs.findIndex(v => v.id === id);
        if (index !== -1) {
            return db_1.db.blogs.splice(index, 1);
        }
        return null;
    }
};
