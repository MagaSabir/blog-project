import {blogRepository} from "../repositories/blog-repository";
import {blogType} from "../db/db";


export const blogsService = {
    async findAllBlogs(): Promise<blogType[]> {
        return blogRepository.findAllBlogs()
    },

    async findBlogById(id: string): Promise<blogType | null | boolean> {
        return blogRepository.findBlogById(id)
    },

    // async createBlog(req: any): Promise<blogType | any> {
    //     const newBlog: newBlog = {
    //         name: req.name,
    //         description: req.description,
    //         websiteUrl: req.websiteUrl,
    //         createdAt: new Date().toISOString(),
    //         isMembership: false
    //     }
    //     await client.db('blogPlatform').collection<dbBlogType>('blogs').insertOne(newBlog)
    //
    //     const {_id, ...el} = newBlog
    //     return {id: _id!.toString(), ...el}
    // },
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

