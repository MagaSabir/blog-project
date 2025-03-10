import express, {Request, Response} from "express";
import {blogRoutes} from "./routes/blogs/blogRoutes";
import {SETTINGS} from "./settings";
import {db} from "./db/db";
import {descriptionValidator, nameValidator, websiteUrlValidator} from "./validator/blogValidator";

export const app = express();
app.use(express.json())

app.use(SETTINGS.PATH.blogs, blogRoutes,  nameValidator, descriptionValidator, websiteUrlValidator)

app.use(SETTINGS.PATH.cleanDB, blogRoutes)