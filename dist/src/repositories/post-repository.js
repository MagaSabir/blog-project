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
    getPosts(page, limit, sortDirection) {
        return __awaiter(this, void 0, void 0, function* () {
            const total = yield mongodb_1.client.db('blogPlatform').collection('posts').countDocuments();
            const result = yield mongodb_1.client.db('blogPlatform').collection('posts')
                .find()
                .skip((page - 1) * limit)
                .limit(limit)
                .sort({ createdAt: sortDirection }).toArray();
            return { total, result };
        });
    },
    getPostById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield mongodb_1.client.db('blogPlatform').collection('posts').findOne({ _id: new mongodb_2.ObjectId(id) });
        });
    },
    createPost(body) {
        return __awaiter(this, void 0, void 0, function* () {
            yield mongodb_1.client.db('blogPlatform').collection('posts').insertOne(body);
            const { _id } = body, rest = __rest(body, ["_id"]);
            return Object.assign({ id: _id.toString() }, rest);
        });
    },
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield mongodb_1.client.db('blogPlatform')
                .collection('posts')
                .deleteOne({ _id: new mongodb_2.ObjectId(id) });
            return result.deletedCount === 1;
        });
    },
    updatePost(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield mongodb_1.client.db('blogPlatform')
                .collection('posts')
                .updateOne({ _id: new mongodb_2.ObjectId(id) }, { $set: body });
            return result.matchedCount === 1;
        });
    },
};
