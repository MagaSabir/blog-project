"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.websiteUrlValidator = exports.descriptionValidator = exports.nameValidator = void 0;
const express_validator_1 = require("express-validator");
exports.nameValidator = (0, express_validator_1.body)('name')
    .isString().withMessage('field: (name) is not string')
    .trim().isLength({ min: 1, max: 15 })
    .withMessage('no more 15 symbol');
exports.descriptionValidator = (0, express_validator_1.body)('description')
    .isString().withMessage('"description" is not string')
    .trim().isLength({ min: 1, max: 500 })
    .withMessage('no more 500 symbol');
exports.websiteUrlValidator = (0, express_validator_1.body)('websiteUrl')
    .isString().withMessage('"website" is not string')
    .trim().isLength({ max: 100 }).isURL()
    .withMessage('bad URL');
