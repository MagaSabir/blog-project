import {blogType, dbBlogType} from "../db/db";
import {client} from "../db/mongodb";
import {ObjectId} from "mongodb";


export const blogRepository = {
    async findAllBlogs(): Promise<blogType[]> {
        return await client.db('blogPlatform').collection<dbBlogType>('blogs').find({}).toArray()
    },

    async findBlogById(id: string): Promise<blogType | null> {
        return await client.db('blogPlatform')
            .collection<dbBlogType>('blogs')
            .findOne({_id: new ObjectId(id)})
    },

    async createBlog(body: any): Promise<blogType | any> {
        const result = await client.db('blogPlatform')
            .collection<dbBlogType>('blogs')
            .insertOne(body)
        const {_id, ...el} = body
        console.log(result.insertedId)
        return {id: _id.toString(), ...el}

    },

    async updateBlog(id: string, body: any): Promise<blogType[] | boolean> {

        const result = await client
            .db('blogPlatform')
            .collection<dbBlogType>('blogs').updateOne(
                {_id: new ObjectId(id)},
                {$set: body})
        return result.matchedCount === 1
    },

    async deleteById(id: string): Promise<blogType[] | boolean> {
        const result = await client.db('blogPlatform').collection<dbBlogType>('blogs').deleteOne({_id: new ObjectId(id)})
        return result.deletedCount === 1
    },
}

