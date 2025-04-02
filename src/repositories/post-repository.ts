import {db, dbBlogType, dbPostType, newPostType, postType} from "../db/db";
import {client} from "../db/mongodb";
import {ObjectId} from "mongodb";
import {blogRepository} from "./blog-repository";

export const postRepository = {
    async getPosts(page: number, limit: number, sortDirection: any): Promise<any> {
        const total = await client.db('blogPlatform').collection('posts').countDocuments()
        const result = await client.db('blogPlatform').collection<dbBlogType>('posts')

            .find()
            .skip((page - 1) * limit)
            .limit(limit)
            .sort({createdAt: sortDirection}).toArray()
        return {total, result}
    },
    async getPostById(id: string): Promise<postType | null> {
        return await client.db('blogPlatform').collection<postType>('posts').findOne({_id: new ObjectId(id)})
    },


    async createPost(body: any): Promise<postType> {
        await client.db('blogPlatform').collection('posts').insertOne(body)
        const {_id, ...rest}: any = body
        return {id: _id.toString(), ...rest}
    },


    async deleteById(id: string): Promise<postType | boolean> {
        const result = await client.db('blogPlatform')
            .collection<dbBlogType>('posts')
            .deleteOne({_id: new ObjectId(id)})
        return result.deletedCount === 1
    },

    async updatePost(id: any, body: any): Promise<postType[] | boolean> {
        const result = await client.db('blogPlatform')
            .collection<dbBlogType>('posts')
            .updateOne(
                {_id: new ObjectId(id)},
                {$set: body})
        return result.matchedCount === 1
    },

}