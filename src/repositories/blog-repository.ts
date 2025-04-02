import {blogType, dbBlogType} from "../db/db";
import {client} from "../db/mongodb";
import {ObjectId} from "mongodb";


export const blogRepository = {
    async findAllBlogsPagination(page: number, limit: number, sortDirection: any, searchNameTerm: any): Promise<any> {
        const total = await client.db('blogPlatform').collection('blogs').countDocuments()
        const filter = searchNameTerm
            ? {name: {$regex: searchNameTerm, $options: 'i'}}
            : {};
        const result = await client.db('blogPlatform').collection<dbBlogType>('blogs')

            .find(filter)
            .skip((page - 1) * limit)
            .limit(limit)
            .sort({createdAt: sortDirection}).toArray()
        return {total, result}
    },

    async findAllBlogs(): Promise<blogType[]> {
        return await client.db('blogPlatform').collection<dbBlogType>('blogs')
            .find({}).toArray()
    },


    async findBlogById(id: string): Promise<blogType | null> {
        return await client.db('blogPlatform')
            .collection<dbBlogType>('blogs')
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

