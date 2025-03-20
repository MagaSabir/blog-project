import {strict} from "node:assert";
import {FieldValidationError, validationResult} from "express-validator";

type blogDbType = {
    blogs: dbBlogType[],
    posts: dbPostType[]
}

export type dbBlogType = {
    name: string,
    description: string,
    websiteUrl: string
}

export type dbPostType = {
    title: string
    shortDescription: string,
    content: string,
    blogId: string
    blogName?: string
}

export const errorsArray = (req: any) => {

    // @ts-ignore
    return validationResult(req).formatWith((error: FieldValidationError) => ({
            message: error.msg,
            field: error.path
        })
    ).array({onlyFirstError: true})
}

export const db: blogDbType = {
    blogs: [],
    posts: []
}

