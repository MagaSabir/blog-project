"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const blogRoutes_1 = require("./routes/blogs/blogRoutes");
const settings_1 = require("./settings");
const blogValidator_1 = require("./validator/blogValidator");
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.use(settings_1.SETTINGS.PATH.blogs, blogRoutes_1.blogRoutes, blogValidator_1.nameValidator, blogValidator_1.descriptionValidator, blogValidator_1.websiteUrlValidator);
exports.app.use(settings_1.SETTINGS.PATH.cleanDB, blogRoutes_1.blogRoutes);
