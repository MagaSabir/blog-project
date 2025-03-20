"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.errorsArray = void 0;
const express_validator_1 = require("express-validator");
const errorsArray = (req) => {
    // @ts-ignore
    return (0, express_validator_1.validationResult)(req).formatWith((error) => ({
        message: error.msg,
        field: error.path
    })).array({ onlyFirstError: true });
};
exports.errorsArray = errorsArray;
exports.db = {
    blogs: [],
    posts: []
};
