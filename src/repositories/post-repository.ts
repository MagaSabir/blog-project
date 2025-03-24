import {db, dbBlogType, dbPostType, newPostType, postType} from "../db/db";
import {client} from "../db/mongodb";
import {ObjectId} from "mongodb";
import {blogRepository} from "./blog-repository";

export const postRepository = {
    async getPosts(): Promise<dbPostType[]> {
        const post = await client.db('blogPlatform').collection<dbPostType>('posts').find({}).toArray()
        return post.map(({_id, ...el}) => ({
            ...el,
            id: _id.toString()
        }))

    },
    async getPostById(id: string): Promise<postType | null> {
        let post = await client.db('blogPlatform').collection<dbPostType>('posts').findOne({_id: new ObjectId(id)})
        console.log(post)
        if (post) {
            const {_id, ...el} = post
            return {id: _id.toString(), ...el}
        } else {
            return null
        }
    },


    async createPost(body: any) {
        let blogName = (await blogRepository.findAllBlogs()).find((el => el.name))
        const newPost: newPostType = {
            title: body.title,
            shortDescription: body.shortDescription,
            content: body.content,
            blogId: body.blogId,
            blogName: blogName?.name,
            createdAt: new Date().toISOString()
        }
        await client.db('blogPlatform').collection('posts').insertOne(newPost)
        const {_id, ...el} = newPost
        return {id: _id, ...el}
    },


    async deleteById(id: string): Promise<postType | boolean> {
        const result = await client.db('blogPlatform').collection<dbBlogType>('posts').deleteOne({_id: new ObjectId(id)})
        return result.deletedCount === 1
    },

    async updatePost(id: any, req: any): Promise<postType[] | boolean> {
        const updateDocument = {
            $set: {
                title: req.title,
                shortDescription: req.shortDescription,
                content: req.content,
            },
        };
        const result = await client.db('blogPlatform').collection<dbBlogType>('posts').updateOne({_id: new ObjectId(id)}, updateDocument)
        return result.matchedCount === 1
    },

}