import {db, dbBlogType} from "../db/db";
import {client} from "../db/mongodb";
import {req} from "../../__tests__/test-helpers";

export const blogRepository = {
    async findBlog(): Promise<dbBlogType[]> {
        return client.db('blogPlatform').collection<dbBlogType>('blogs').find({}).toArray()
    },

    async findBlogById(id: string): Promise<dbBlogType | null> {

        let blog: dbBlogType | null = await client.db('blogPlatform').collection<dbBlogType>('blog').findOne({id: id})
        if (blog) {
            return blog
        } else {
            return null
        }
    },

    async createBlog(req: any): Promise<dbBlogType[]> {
        const newBlog = {
            id: Math.floor(Date.now() + Math.random()).toString(),
            name: req.name,
            description: req.description,
            websiteUrl: req.websiteUrl
        }
        const result = await client.db('blogPlatform').collection<dbBlogType>('blogs').insertOne(newBlog)
        console.log(result)
        // @ts-ignore
        return newBlog
    },
    async updateBlog(id: any, req: any): Promise<dbBlogType> {

        const index = db.blogs.findIndex(p => p.id === id)
        if (index !== -1) {
            db.blogs = db.blogs.map(el => el.id === id ? {...el, ...req} : el)
            return db.blogs[index]
        }
        // @ts-ignore
        return null
    },

    async deleteById(id: string): Promise<dbBlogType[]> {
        const index = db.blogs.findIndex(v => v.id === id)
        if (index !== -1) {
            return db.blogs.splice(index, 1)
        }
        // @ts-ignore
        return null
    }
}