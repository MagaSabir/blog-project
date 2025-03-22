import {strict} from "node:assert";
import {FieldValidationError, validationResult} from "express-validator";
import {ObjectId} from "mongodb";

type blogDbType = {
    blogs: dbBlogType[],
    posts: dbPostType[]
}

export type dbBlogType = {
    _id?: ObjectId | string,
    name: string,
    description: string,
    websiteUrl: string
}

export type blogType = {
    id: string | undefined,
    name: string,
    description: string,
    websiteUrl: string
}

export type dbPostType = {
    title: string
    shortDescription: string,
    content: string,
}

export type postType = {
    id: string
    title: string
    shortDescription: string,
    content: string,
}

export type newPostType = {
    _id?: ObjectId | undefined
    title: any
    shortDescription: any
    content: string
    blogId: string
    blogName: string | undefined
    createdAt: string
}

export type newBlog = {
    _id?: string
    name: string,
    description: string,
    websiteUrl: string,
    createdAt: string,
    isMembership: boolean
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

