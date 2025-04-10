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
exports.blogsService = void 0;
const blog_repository_1 = require("../repositories/blog-repository");
const mongodb_1 = require("mongodb");
exports.blogsService = {
    findAllBlogsPagination(pageNumber, pageSize, sortDirection, sortBy, searchNameTerm) {
        return __awaiter(this, void 0, void 0, function* () {
            const { totalCount, blogs } = yield blog_repository_1.blogRepository.findAllBlogsPagination(pageNumber, pageSize, sortDirection, sortBy, searchNameTerm);
            const items = blogs.map((_a) => {
                var { _id } = _a, rest = __rest(_a, ["_id"]);
                return (Object.assign({ id: _id.toString() }, rest));
            });
            return { totalCount, items };
        });
    },
    findBlogById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!mongodb_1.ObjectId.isValid(id)) {
                return null;
            }
            const blog = yield blog_repository_1.blogRepository.findBlogById(id);
            if (!blog) {
                return null;
            }
            const { _id } = blog, rest = __rest(blog, ["_id"]);
            return Object.assign({ id: _id === null || _id === void 0 ? void 0 : _id.toString() }, rest);
        });
    },
    createBlog(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const newBlog = {
                name: body.name,
                description: body.description,
                websiteUrl: body.websiteUrl,
                createdAt: new Date().toISOString(),
                isMembership: false
            };
            return yield blog_repository_1.blogRepository.createBlog(newBlog);
        });
    },
    updateBlog(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedBlog = {
                name: body.name,
                description: body.description,
                websiteUrl: body.websiteUrl
            };
            return yield blog_repository_1.blogRepository.updateBlog(id, updatedBlog);
        });
    },
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield blog_repository_1.blogRepository.deleteById(id);
        });
    },
    createPostByBlogId(body, param) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = (yield blog_repository_1.blogRepository.findBlogById(param));
            const newPost = {
                title: body.title,
                shortDescription: body.shortDescription,
                content: body.content,
                blogId: param.id,
                blogName: blog.name,
                createdAt: new Date().toISOString()
            };
            return yield blog_repository_1.blogRepository.createPostByBlogId(newPost);
        });
    },
    getPostsByBlogId(id, page, limit, sortDirection, sortBy) {
        return __awaiter(this, void 0, void 0, function* () {
            const { result, total } = yield blog_repository_1.blogRepository.getPostsByBlogId(id, page, limit, sortDirection, sortBy);
            if (!result) {
                return null;
            }
            const post = result.map((_a) => {
                var { _id } = _a, rest = __rest(_a, ["_id"]);
                return (Object.assign({ id: _id.toString() }, rest));
            });
            return { post, total };
        });
    },
};
