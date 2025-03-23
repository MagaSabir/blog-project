import express, {Request, Response} from "express";
import {blogRoutes} from "./routes/blogs/blog-routes";
import {SETTINGS} from "./settings";

import {descriptionValidator, nameValidator, websiteUrlValidator} from "./validator/blog-validations";
import {postsRoutes} from "./routes/posts/post-routes";
import {contentValidator, shortDescriptionValidator, titleValidator} from "./validator/post-validations";
import {cleanDbRoutes} from "./routes/cleanDb/cleanDb-route";


export const app = express();
app.use(express.json())
app.use(SETTINGS.PATH.posts, postsRoutes, titleValidator, shortDescriptionValidator, websiteUrlValidator, contentValidator)
app.use(SETTINGS.PATH.blogs, blogRoutes, nameValidator, descriptionValidator, websiteUrlValidator)


app.use(SETTINGS.PATH.cleanDB, cleanDbRoutes)

