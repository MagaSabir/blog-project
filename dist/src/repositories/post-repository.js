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
exports.postRepository = void 0;
const db_1 = require("../db/db");
const blog_repository_1 = require("./blog-repository");
const mongodb_1 = require("../db/mongodb");
exports.postRepository = {
    findPost() {
        return db_1.db.posts;
    },
    findPostById(id) {
        return db_1.db.posts.find(v => v.id === id);
    },
    createPost(req) {
        return __awaiter(this, void 0, void 0, function* () {
            let blog = (yield blog_repository_1.blogRepository.findBlog()).find((el => el.id));
            const newPost = {
                id: Math.floor(Date.now() + Math.random()).toString(),
                title: req.title,
                shortDescription: req.shortDescription,
                content: req.content,
                blogId: blog === null || blog === void 0 ? void 0 : blog.id,
                blogName: blog === null || blog === void 0 ? void 0 : blog.name
            };
            let result = yield mongodb_1.client.db('blogPlatform').collection('posts').insertOne(newPost);
            return newPost;
        });
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
