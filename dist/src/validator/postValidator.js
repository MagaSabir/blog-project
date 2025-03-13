"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogId = exports.contentValidator = exports.shortDescriptionValidator = exports.titleValidator = void 0;
const express_validator_1 = require("express-validator");
exports.titleValidator = (0, express_validator_1.body)('title')
    .trim().isLength({ min: 1, max: 30 }).withMessage('Max length 30 symbols')
    .isString().withMessage('Title is not string');
exports.shortDescriptionValidator = (0, express_validator_1.body)('shortDescription')
    .trim().isLength({ min: 1, max: 100 }).withMessage('Max length 100 symbols')
    .isString().withMessage('shortDescription is not string');
exports.contentValidator = (0, express_validator_1.body)('content')
    .trim().isLength({ min: 1, max: 1000 }).withMessage('Max length 1000 symbols');
exports.blogId = (0, express_validator_1.body)('blogId').trim().isEmpty().withMessage('blog ig');
