import {blogType, dbBlogType, postType} from "../db/db";
import {client} from "../db/mongodb";
import {ObjectId} from "mongodb";


export const blogRepository = {
    async findAllBlogsPagination(page: number, limit: number, sortDirection: any, sortBy: any, searchNameTerm: any): Promise<any> {
        const filter = searchNameTerm
            ? {name: {$regex: searchNameTerm, $options: 'i'}}
            : {};
        const total = await client.db('blogPlatform')
            .collection('blogs').countDocuments(filter)

        const result = await client.db('blogPlatform')
            .collection<dbBlogType>('blogs')
            .find(filter)
            .skip((page - 1) * limit)
            .limit(limit)
            .sort({[sortBy]: sortDirection}).toArray()
        return {total, result}
    },

    async findAllBlogs(): Promise<blogType[]> {
        return await client.db('blogPlatform').collection<dbBlogType>('blogs')
            .find({}).toArray()
    },


    async findBlogById(id: string): Promise<any> {
        return await client.db('blogPlatform')
            .collection<dbBlogType[]>('blogs')
            .findOne({_id: new ObjectId(id)})
    },

    async createBlog(body: any): Promise<blogType | any> {
        await client.db('blogPlatform')
            .collection<dbBlogType>('blogs')
            .insertOne(body)
        const {_id, ...el} = body
        return {id: _id.toString(), ...el}

    },


    async updateBlog(id: string, body: any): Promise<blogType[] | boolean> {

        const result = await client
            .db('blogPlatform')
            .collection<dbBlogType[]>('blogs').updateOne(
                {_id: new ObjectId(id)},
                {$set: body})
        return result.matchedCount === 1
    },

    async deleteById(id: string): Promise<blogType[] | boolean> {
        const result = await client.db('blogPlatform')
            .collection<dbBlogType[]>('blogs').deleteOne({_id: new ObjectId(id)})
        return result.deletedCount === 1
    },

    async createPostByBlogId(body: any): Promise<postType> {
        await client.db('blogPlatform').collection('posts').insertOne(body)
        const {_id, ...rest}: any = body
        return {id: _id.toString(), ...rest}
    },

    async getPostsByBlogId(id: string, page: number, limit: number, sortDirection: any, sortBy: any) {
        const total = await client.db('blogPlatform')
            .collection('posts').countDocuments({blogId: id})

        const result = await client.db('blogPlatform').collection<dbBlogType>('posts')
            .find({blogId: id})
            .skip((page - 1) * limit)
            .limit(limit)
            .sort({[sortBy]: sortDirection}).toArray()
        return {result, total}
    }
}


