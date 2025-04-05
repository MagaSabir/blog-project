import {blogRepository} from "../repositories/blog-repository";
import {blogType, CreateBlogInput, dbBlogType, newPostType,} from "../db/db";
import {ObjectId} from "mongodb";


export const blogsService = {
    async findAllBlogsPagination(pageNumber: number, pageSize: number, sortDirection: 1 | -1, sortBy: any, searchNameTerm: any): Promise<{
        totalCount: number;
        items: blogType[]
    }> {

        const {totalCount, blogs} = await blogRepository.findAllBlogsPagination(
            pageNumber,
            pageSize,
            sortDirection,
            sortBy,
            searchNameTerm
        );
        const items = blogs.map(({_id, ...rest}) => ({
            id: _id.toString(),
            ...rest
        }));
        return {totalCount, items}
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
            isMembership: false
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

    async createPostByBlogId(body: newPostType, param: any): Promise<any> {
        const blog = (await blogRepository.findBlogById(param))
        const newPost = {
            title: body.title,
            shortDescription: body.shortDescription,
            content: body.content,
            blogId: param.id,
            blogName: blog.name,
            createdAt: new Date().toISOString()
        }
        return await blogRepository.createPostByBlogId(newPost)
    },

    async getPostsByBlogId(id: string, page: number, limit: number, sortDirection: any, sortBy: any): Promise<any> {

        const {result, total} = await blogRepository.getPostsByBlogId(id, page, limit, sortDirection, sortBy)
        if (!result) {
            return null
        }

        const post = result.map(({_id, ...rest}) => ({
            id: _id!.toString(), ...rest
        }))
        return {post, total}
    },
}

