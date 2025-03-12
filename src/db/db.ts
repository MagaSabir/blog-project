import {strict} from "node:assert";

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


export const db: blogDbType = {
    blogs: [{
        id: "1",
        name: "string",
        description: "string",
        websiteUrl: "string"
    }],
    posts: [{
        id: "1",
        title: 'string',
        shortDescription: "string",
        content: "string",
        blogId: "string",
        blogName: "string"
    }]
}

