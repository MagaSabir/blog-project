import {blogRepository} from "../repositories/blog-repository";
import {blogType, dbBlogType} from "../db/db";
import {ObjectId} from "mongodb";


export const blogsService = {
    async findBlogs(): Promise<blogType[]> {
        return await blogRepository.findAllBlogs()
    },

    async findBlogById(id: string): Promise<blogType | null | boolean> {
        if (!ObjectId.isValid(id)) {
            return null
        }
        const blog: dbBlogType | null = await blogRepository.findBlogById(id)
        if (!blog) {
            return null
        }
        const {_id, ...rest} = blog
        return {id: _id?.toString(), ...rest}
    },

    async createBlog(body: string): Promise<blogType | any> {
        return await blogRepository.createBlog(body)
    },
    //
    // async updateBlog(id: any, req: any): Promise<blogType[] | boolean> {
    //     const updateDocument = {
    //         $set: {
    //             name: req.name,
    //             description: req.description,
    //             websiteUrl: req.websiteUrl,
    //         },
    //     };
    //     const result = await client.db('blogPlatform').collection<dbBlogType>('blogs').updateOne({_id: new ObjectId(id)}, updateDocument)
    //     return result.matchedCount === 1
    // },
    //
    // async deleteById(id: string): Promise<blogType[] | boolean> {
    //     const result = await client.db('blogPlatform').collection<dbBlogType>('blogs').deleteOne({_id: new ObjectId(id)})
    //     return result.deletedCount === 1
    // },


}

