"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SETTINGS = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.SETTINGS = {
    PORT: process.env.PORT || 3020,
    PATH: {
        blogs: '/blogs',
        posts: '/posts',
        cleanDB: '/testing/all-data'
    },
    ADMIN_AUTH: 'admin:qwerty',
    DB_NAME: "Blogs"
};
const mongoURI = process.env.MONGO_URL || 'mongodb://0.0.0.0:27017';
console.log(mongoURI);
