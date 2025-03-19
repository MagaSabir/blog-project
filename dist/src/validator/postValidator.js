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
exports.blogIdValidator = exports.contentValidator = exports.shortDescriptionValidator = exports.titleValidator = void 0;
const express_validator_1 = require("express-validator");
const blog_repository_1 = require("../repositories/blog-repository");
exports.titleValidator = (0, express_validator_1.body)('title')
    .trim().isLength({ min: 1, max: 30 }).withMessage('Max length 30 symbols')
    .isString().withMessage('Title is not string');
exports.shortDescriptionValidator = (0, express_validator_1.body)('shortDescription')
    .trim().isLength({ min: 1, max: 100 }).withMessage('Max length 100 symbols')
    .isString().withMessage('shortDescription is not string');
exports.contentValidator = (0, express_validator_1.body)('content')
    .trim().isLength({ min: 1, max: 1000 }).withMessage('Max length 1000 symbols');
exports.blogIdValidator = (0, express_validator_1.body)('blogId').isString().withMessage('not string')
    .trim().custom((blogId) => __awaiter(void 0, void 0, void 0, function* () {
    return !!(yield blog_repository_1.blogRepository.findBlogById(blogId));
})).withMessage('no blog');
