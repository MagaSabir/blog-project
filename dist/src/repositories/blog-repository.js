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
exports.blogRepository = void 0;
const db_1 = require("../db/db");
const mongodb_1 = require("../db/mongodb");
exports.blogRepository = {
    findBlog() {
        return __awaiter(this, void 0, void 0, function* () {
            return mongodb_1.client.db('blogPlatform').collection('blogs').find({}).toArray();
        });
    },
    findBlogById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let blog = yield mongodb_1.client.db('blogPlatform').collection('blog').findOne({ id: id });
            if (blog) {
                return blog;
            }
            else {
                return null;
            }
        });
    },
    createBlog(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const newBlog = {
                id: Math.floor(Date.now() + Math.random()).toString(),
                name: req.name,
                description: req.description,
                websiteUrl: req.websiteUrl
            };
            const result = yield mongodb_1.client.db('blogPlatform').collection('blogs').insertOne(newBlog);
            console.log(result);
            // @ts-ignore
            return newBlog;
        });
    },
    updateBlog(id, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const index = db_1.db.blogs.findIndex(p => p.id === id);
            if (index !== -1) {
                db_1.db.blogs = db_1.db.blogs.map(el => el.id === id ? Object.assign(Object.assign({}, el), req) : el);
                return db_1.db.blogs[index];
            }
            // @ts-ignore
            return null;
        });
    },
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const index = db_1.db.blogs.findIndex(v => v.id === id);
            if (index !== -1) {
                return db_1.db.blogs.splice(index, 1);
            }
            // @ts-ignore
            return null;
        });
    }
};
