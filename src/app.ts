import express, {Request, Response} from "express";
import {blogRoutes} from "./routes/blogs/blogRoutes";
import {SETTINGS} from "./settings";

import {descriptionValidator, nameValidator, websiteUrlValidator} from "./validator/blogValidator";
import {postsRoutes} from "./routes/posts/postRoutes";
import {contentValidator, shortDescriptionValidator, titleValidator} from "./validator/postValidator";

export const app = express();
app.use(express.json())
app.use(SETTINGS.PATH.posts, postsRoutes, titleValidator, shortDescriptionValidator, websiteUrlValidator, contentValidator)
app.use(SETTINGS.PATH.blogs, blogRoutes, nameValidator, descriptionValidator, websiteUrlValidator)


app.use(SETTINGS.PATH.cleanDB, blogRoutes)