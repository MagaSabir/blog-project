import {strict} from "node:assert";
import {FieldValidationError, validationResult} from "express-validator";

type blogDbType = {
    blogs: dbBlogType[],
    posts: dbPostType[]
}

export type dbBlogType = {
    id: string,
    name: string,
    description: string,
    websiteUrl: string
}

type dbPostType = {
    id: string,
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
    blogs: [{
        id: '1',
        name: 'ss',
        description: 'ss',
        websiteUrl: 'http://google.com'
    }],
    posts: []
}

