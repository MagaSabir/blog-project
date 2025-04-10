import {FieldValidationError, validationResult} from "express-validator";
import {ObjectId} from "mongodb";

type blogDbType = {
    blogs: dbBlogType[],
    posts: dbPostType[]
}

export type dbBlogType = {
    _id: ObjectId,
    name: string,
    description: string,
    websiteUrl: string
}


export type blogType = {
    id: string
    name: string,
    description: string,
    websiteUrl: string
}

export type dbPostType = {
    _id?: string
    title: string
    shortDescription: string,
    content: string,
}

export type postType = {
    id?: string
    title: string
    shortDescription: string,
    content: string,
    total: number,
    result: []
}

export type newPostType = {
    id?: ObjectId | undefined
    title: any
    shortDescription: any
    content: string
    blogId: string
    blogName: string | undefined
    createdAt: string
}

export type createdPost = {
    title: string,
    shortDescription: string
    websiteUrl?: string,
    content: string,
    blogId: string,
    blogName?: string
}


export type CreateBlogInput = {
    name: string;
    description: string;
    websiteUrl: string;
};

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

