import {db, dbBlogType} from "../db/db";
import {client} from "../db/mongodb";
import {ObjectId} from "mongodb";


export const blogRepository = {
    async findBlog(): Promise<dbBlogType[]> {
        const blog = await client.db('blogPlatform').collection<dbBlogType>('blogs').find({}).toArray()
        return blog.map(({_id, ...el}) => ({
            ...el,
            id: _id.toString()
        }));

    },

    async findBlogById(id: string): Promise<dbBlogType | null> {
        if (!ObjectId.isValid(id)) {
            return null
        }
        let blog: dbBlogType | null = await client.db('blogPlatform').collection<dbBlogType>('blogs').findOne({_id: new ObjectId(id)})
        if (blog) {
            return blog
        } else {
            return null
        }
    },

    async createBlog(req: any): Promise<dbBlogType[]> {
        const newBlog = {
            name: req.name,
            description: req.description,
            websiteUrl: req.websiteUrl
        }
        await client.db('blogPlatform').collection<dbBlogType>('blogs').insertOne(newBlog)

        // @ts-ignore
        return newBlog
    },
    async updateBlog(id: any, req: any): Promise<dbBlogType[] | boolean> {
        const updateDocument = {
            $set: {
                name: req.name,
                description: req.description,
                websiteUrl: req.websiteUrl
            },
        };
        const result = await client.db('blogPlatform').collection<dbBlogType>('blogs').updateOne({_id: new ObjectId(id)}, updateDocument)
        return result.matchedCount === 1
    },
    async deleteById(id: string): Promise<dbBlogType[] | boolean> {
        const result = await client.db('blogPlatform').collection<dbBlogType>('blogs').deleteOne({_id: new ObjectId(id)})
        return result.deletedCount === 1
    },

    async cleanBlogsDB(): Promise<boolean> {
        const blogsResult = await client.db('blogPlatform').collection('blogs').deleteMany({})
        const postsResult = await client.db('blogPlatform').collection('posts').deleteMany({})
        return blogsResult.deletedCount === 1 && postsResult.deletedCount === 1
    }
}

