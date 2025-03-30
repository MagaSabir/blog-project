import {dbPostType, newPostType, postType} from "../db/db";
import {blogRepository} from "../repositories/blog-repository";
import {postRepository} from "../repositories/post-repository";

export const postsService = {
    async getPosts(): Promise<postType[]> {
        const result = await postRepository.getPosts()
        const {_id, ...rest}: any = result
        return {id: _id.toString(), ...rest}
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
        let blogName = (await blogRepository.findAllBlogs()).find((el => el.name))
        const newPost: newPostType = {
            title: body.title,
            shortDescription: body.shortDescription,
            content: body.content,
            blogId: body.blogId,
            blogName: blogName?.name,
            createdAt: new Date().toISOString()
        }
        return await postRepository.createPost(newPost)
    }
}

type createdPost = {
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string
}