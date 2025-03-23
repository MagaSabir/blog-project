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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRepository = void 0;
const mongodb_1 = require("../db/mongodb");
const mongodb_2 = require("mongodb");
const blog_repository_1 = require("./blog-repository");
exports.postRepository = {
    getPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield mongodb_1.client.db('blogPlatform').collection('posts').find({}).toArray();
            return post.map((_a) => {
                var { _id } = _a, el = __rest(_a, ["_id"]);
                return (Object.assign(Object.assign({}, el), { id: _id.toString() }));
            });
        });
    },
    getPostsById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let post = yield mongodb_1.client.db('blogPlatform').collection('posts').findOne({ _id: new mongodb_2.ObjectId(id) });
            console.log(post);
            if (post) {
                const { _id } = post, el = __rest(post, ["_id"]);
                return Object.assign({ id: _id.toString() }, el);
            }
            else {
                return null;
            }
        });
    },
    createPost(body) {
        return __awaiter(this, void 0, void 0, function* () {
            let blogName = (yield blog_repository_1.blogRepository.findAllBlogs()).find((el => el.name));
            const newPost = {
                title: body.title,
                shortDescription: body.shortDescription,
                content: body.content,
                blogId: body.blogId,
                blogName: blogName === null || blogName === void 0 ? void 0 : blogName.name,
                createdAt: new Date().toISOString()
            };
            yield mongodb_1.client.db('blogPlatform').collection('posts').insertOne(newPost);
            const { _id } = newPost, el = __rest(newPost, ["_id"]);
            return Object.assign({ id: _id }, el);
        });
    },
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield mongodb_1.client.db('blogPlatform').collection('posts').deleteOne({ _id: new mongodb_2.ObjectId(id) });
            return result.deletedCount === 1;
        });
    },
    updatePost(id, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateDocument = {
                $set: {
                    title: req.title,
                    shortDescription: req.shortDescription,
                    content: req.content,
                },
            };
            const result = yield mongodb_1.client.db('blogPlatform').collection('posts').updateOne({ _id: new mongodb_2.ObjectId(id) }, updateDocument);
            return result.matchedCount === 1;
        });
    },
};
