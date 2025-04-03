import {createdPost, dbPostType, newPostType, postType} from "../db/db";
import {blogRepository} from "../repositories/blog-repository";
import {postRepository} from "../repositories/post-repository";
import {param} from "express-validator";

export const postsService = {
    async getPosts(page: number, limit: number, sortDirection: any): Promise<any> {
        const {total, result} = await postRepository.getPosts(page, limit, sortDirection)
        // @ts-ignore
        const post = result.map(({_id, ...rest}) => ({
            id: _id!.toString(), ...rest
        }))
        return {total, post}
    },

    async getPostById(id: string): Promise<postType | null> {
        const result = await postRepository.getPostById(id)
        if (!result) {
            return null
        }
        const {_id, ...rest}: any = result
        return {id: _id.toString(), ...rest}
    },

    async createPost(body: createdPost): Promise<postType | null> {
        const blogName = (await blogRepository.findAllBlogs()).find((el => el.name))
        const newPost: newPostType = {
            title: body.title,
            shortDescription: body.shortDescription,
            content: body.content,
            blogId: body.blogId,
            blogName: blogName?.name,
            createdAt: new Date().toISOString()
        }
        return await postRepository.createPost(newPost)
    },

    async updatePost(id: string, body: createdPost): Promise<postType[] | boolean> {
        const updatedPost = {
            title: body.title,
            shortDescription: body.shortDescription,
            content: body.content,
            blogId: body.blogId
        }
        return await postRepository.updatePost(id, updatedPost)
    },

    async deletePostById(id: string): Promise<postType | boolean> {
        return await postRepository.deleteById(id)
    }
}


