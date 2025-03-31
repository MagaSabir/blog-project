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
exports.postsService = void 0;
const blog_repository_1 = require("../repositories/blog-repository");
const post_repository_1 = require("../repositories/post-repository");
exports.postsService = {
    getPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield post_repository_1.postRepository.getPosts();
            return result.map((_a) => {
                var { _id } = _a, rest = __rest(_a, ["_id"]);
                return (Object.assign({ id: _id === null || _id === void 0 ? void 0 : _id.toString() }, rest));
            });
        });
    },
    getPostById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield post_repository_1.postRepository.getPostById(id);
            if (!result) {
                return null;
            }
            const { _id } = result, rest = __rest(result, ["_id"]);
            return Object.assign({ id: _id.toString() }, rest);
        });
    },
    createPost(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const blogName = (yield blog_repository_1.blogRepository.findAllBlogs()).find((el => el.name));
            const newPost = {
                title: body.title,
                shortDescription: body.shortDescription,
                content: body.content,
                blogId: body.blogId,
                blogName: blogName === null || blogName === void 0 ? void 0 : blogName.name,
                createdAt: new Date().toISOString()
            };
            return yield post_repository_1.postRepository.createPost(newPost);
        });
    },
    updatePost(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedPost = {
                title: body.title,
                shortDescription: body.shortDescription,
                websiteUrl: body.websiteUrl,
                content: body.content,
                blogId: body.blogId
            };
            return yield post_repository_1.postRepository.updatePost(id, updatedPost);
        });
    },
    deletePostById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield post_repository_1.postRepository.deleteById(id);
        });
    }
};
