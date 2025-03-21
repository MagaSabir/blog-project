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
        // if (!ObjectId.isValid(id)) {
        //     return true
        // }
        let blog: dbBlogType | null = await client.db('blogPlatform').collection<dbBlogType>('blogs').findOne({_id: new ObjectId(id)})
        if (blog) {
            const {_id, ...el} = blog
            return {id: _id?.toString(), ...el}
        } else {
            return null
        }
    },

    async createBlog(req: any): Promise<blogType | any> {
        const newBlog: newBlog = {
            name: req.name,
            description: req.description,
            websiteUrl: req.websiteUrl,
            createdAt: new Date().toISOString(),
            isMembership: true
        }
        await client.db('blogPlatform').collection<dbBlogType>('blogs').insertOne(newBlog)

        const {_id, ...el} = newBlog
        return {id: _id?.toString(), ...el}
    },

    async updateBlog(id: any, req: any): Promise<blogType[] | boolean> {
        const updateDocument = {
            $set: {
                name: req.name,
                description: req.description,
                websiteUrl: req.websiteUrl,
            },
        };
        const result = await client.db('blogPlatform').collection<dbBlogType>('blogs').updateOne({_id: new ObjectId(id)}, updateDocument)
        return result.matchedCount === 1
    },

    async deleteById(id: string): Promise<blogType[] | boolean> {
        const result = await client.db('blogPlatform').collection<dbBlogType>('blogs').deleteOne({_id: new ObjectId(id)})
        return result.deletedCount === 1
    },

    async cleanBlogsDB(): Promise<boolean> {
        const blogsResult = await client.db('blogPlatform').collection('blogs').deleteMany({})
        const postsResult = await client.db('blogPlatform').collection('posts').deleteMany({})
        return blogsResult.deletedCount === 1 && postsResult.deletedCount === 1
    }
}

