import {config} from "dotenv";

config()

export const SETTINGS = {
    PORT: process.env.PORT || 3020,
    PATH: {
        blogs: '/blogs',
        posts: '/posts',
        cleanDB: '/testing/all-data'
    },
    ADMIN_AUTH: 'admin:qwerty',
    DB_NAME: "Blogs"
}

const mongoURI = process.env.MONGO_URL || 'mongodb://0.0.0.0:27017'


console.log(mongoURI)