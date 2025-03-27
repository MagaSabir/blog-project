import {blogType, dbBlogType, newBlog} from "../db/db";
import {client} from "../db/mongodb";
import {ObjectId} from "mongodb";


export const blogRepository = {
    async findAllBlogs(): Promise<blogType[]> {
        const blog = await client.db('blogPlatform').collection<dbBlogType>('blogs').find({}).toArray()
        return blog.map(({_id, ...el}) => ({
            id: _id.toString(),
            ...el,
        }));
    },

    async findBlogById(id: string): Promise<blogType | null> {
        return await client.db('blogPlatform').collection<dbBlogType>('blogs').findOne({_id: new ObjectId(id)})
    },

    async createBlog(body: any): Promise<blogType | any> {
        const newBlog: newBlog = {
            name: body.name,
            description: body.description,
            websiteUrl: body.websiteUrl,
            createdAt: new Date().toISOString(),
            isMembership: false
        }
        const result = await client.db('blogPlatform').collection<dbBlogType>('blogs').insertOne(newBlog)
        const {_id, ...el} = newBlog
        return {id: result.insertedId.toString(), ...el}
    },

    async updateBlog(id: string, body: any): Promise<blogType[] | boolean> {
        const updateDocument = {
            $set: {
                name: body.name,
                description: body.description,
                websiteUrl: body.websiteUrl,
            },
        };
        const result = await client.db('blogPlatform').collection<dbBlogType>('blogs').updateOne({_id: new ObjectId(id)}, updateDocument)
        return result.matchedCount === 1
    },

    async deleteById(id: string): Promise<blogType[] | boolean> {
        const result = await client.db('blogPlatform').collection<dbBlogType>('blogs').deleteOne({_id: new ObjectId(id)})
        return result.deletedCount === 1
    },
}

