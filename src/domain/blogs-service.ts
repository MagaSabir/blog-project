import {blogRepository} from "../repositories/blog-repository";
import {blogType, CreateBlogInput, dbBlogType} from "../db/db";
import {ObjectId} from "mongodb";


export const blogsService = {
    async findBlogs(): Promise<blogType[]> {
        const blogs: dbBlogType[] = await blogRepository.findAllBlogs()
        return blogs.map(({_id, ...rest}) => ({
            id: _id?.toString(), ...rest
        }))
    },

    async findBlogById(id: string): Promise<blogType | null | boolean> {
        if (!ObjectId.isValid(id)) {
            return null
        }
        const blog: dbBlogType | null = await blogRepository.findBlogById(id)
        if (!blog) {
            return null
        }
        const {_id, ...rest} = blog
        return {id: _id?.toString(), ...rest}
    },

    async createBlog(body: CreateBlogInput): Promise<blogType | any> {
        const newBlog = {
            name: body.name,
            description: body.description,
            websiteUrl: body.websiteUrl,
            createdAt: new Date().toISOString(),
            isMembership: true
        }
        return await blogRepository.createBlog(newBlog)

    },

    async updateBlog(id: any, body: CreateBlogInput): Promise<blogType[] | boolean> {
        const updatedBlog = {
            name: body.name,
            description: body.description,
            websiteUrl: body.websiteUrl
        }
        return await blogRepository.updateBlog(id, updatedBlog)
    },

    async deleteById(id: string): Promise<blogType[] | boolean> {
        return await blogRepository.deleteById(id)

    },
}

