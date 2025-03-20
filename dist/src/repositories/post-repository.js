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
exports.postRepository = {
    findPost() {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield mongodb_1.client.db('blogPlatform').collection('posts').find({}).toArray();
            console.log(post);
            return post.map((_a) => {
                var { _id } = _a, el = __rest(_a, ["_id"]);
                return (Object.assign(Object.assign({}, el), { id: _id.toString() }));
            });
        });
    },
    findPostById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!mongodb_2.ObjectId.isValid(id)) {
                return null;
            }
            // @ts-ignore
            return yield mongodb_1.client.db('blogPlatform').collection('posts').findOne({ _id: new mongodb_2.ObjectId(id) });
        });
    },
    createPost(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = yield mongodb_1.client.db('blogPlatform').collection('posts').findOne({ _id: new mongodb_2.ObjectId(req.id) });
            const newPost = {
                title: req.title,
                shortDescription: req.shortDescription,
                content: req.content,
                blogId: "sdf",
                blogName: 'Adsf'
            };
            yield mongodb_1.client.db('blogPlatform').collection('posts').insertOne(newPost);
            return newPost;
        });
    },
    // deleteById(id: string): any {
    //     const index = db.posts.findIndex(v => v.id === id)
    //     if (index !== -1) {
    //         return db.posts.splice(index, 1)
    //     }
    //     return null
    // },
    //
    // updatePost(id: string, req: any): any {
    //     let blogId: any = db.blogs.map(el => el.id)
    //     let blogName = db.blogs.find((el) => el.id === blogId[blogId.length - 1])
    //     const index = db.posts.findIndex(p => p.id === id)
    //     if (index !== -1) {
    //         db.posts = db.posts.map(el => el.id === id ? {...el, ...req, blogName: blogName?.name} : el)
    //         return db.posts[index]
    //     }
    //     return null
    // }
    cleanPostsDB() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield mongodb_1.client.db('blogPlatform').collection('posts').deleteMany({});
            return result.deletedCount === 1;
        });
    }
};
