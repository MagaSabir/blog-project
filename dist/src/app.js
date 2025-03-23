"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const blog_routes_1 = require("./routes/blogs/blog-routes");
const settings_1 = require("./settings");
const blog_validations_1 = require("./validator/blog-validations");
const post_routes_1 = require("./routes/posts/post-routes");
const post_validations_1 = require("./validator/post-validations");
const cleanDb_route_1 = require("./routes/cleanDb/cleanDb-route");
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.use(settings_1.SETTINGS.PATH.posts, post_routes_1.postsRoutes, post_validations_1.titleValidator, post_validations_1.shortDescriptionValidator, blog_validations_1.websiteUrlValidator, post_validations_1.contentValidator);
exports.app.use(settings_1.SETTINGS.PATH.blogs, blog_routes_1.blogRoutes, blog_validations_1.nameValidator, blog_validations_1.descriptionValidator, blog_validations_1.websiteUrlValidator);
exports.app.use(settings_1.SETTINGS.PATH.cleanDB, cleanDb_route_1.cleanDbRoutes);
