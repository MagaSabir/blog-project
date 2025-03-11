"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogRepository = void 0;
const db_1 = require("../db/db");
exports.blogRepository = {
    findBlog() {
        return db_1.db.blogs;
    },
    findBlogById(req) {
        const videoId = parseInt(req);
        let video = db_1.db.blogs.find(v => v.id === req);
        return video;
    },
    createBlog(reqBlog) {
        const newBlog = {
            id: Math.floor(Date.now() + Math.random()).toString(),
            name: reqBlog.name,
            description: reqBlog.description,
            websiteUrl: reqBlog.websiteUrl
        };
        db_1.db.blogs.push(newBlog);
        return newBlog;
    }
};
