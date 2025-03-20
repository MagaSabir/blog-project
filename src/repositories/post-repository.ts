import {db, dbPostType} from "../db/db";
import {blogRepository} from "./blog-repository";
import {client} from "../db/mongodb";
import {ObjectId} from "mongodb";

export const postRepository = {
    async findPost(): Promise<dbPostType[]> {
        const post = await client.db('blogPlatform').collection<dbPostType>('posts').find({}).toArray()
        console.log(post)
        return post.map(({_id, ...el}) => ({
            ...el,
            id: _id.toString()
        }))

    },
    async findPostById(id: string): Promise<dbPostType | null> {
        if (!ObjectId.isValid(id)) {
            return null
        }
        // @ts-ignore
        return await client.db('blogPlatform').collection('posts').findOne({_id: new ObjectId(id)}
        )
    },

    async createPost(req: any) {
        const id = await client.db('blogPlatform').collection('posts').findOne({_id: new ObjectId(req.id)})
        const newPost = {
            title: req.title,
            shortDescription: req.shortDescription,
            content: req.content,
            blogId: "sdf",
            blogName: 'Adsf'
        }
        await client.db('blogPlatform').collection('posts').insertOne(newPost)
        return newPost
    },

    // deleteById(id: string): any {
    //     const index = db.posts.findIndex(v => v.id === id)
    //     if (index !== -1) {
    //         return db.posts.splice(index, 1)
    //     }
    //     return null
    // },
    //
    // updatePost(id: string, req: any): any {
    //     let blogId: any = db.blogs.map(el => el.id)
    //     let blogName = db.blogs.find((el) => el.id === blogId[blogId.length - 1])
    //     const index = db.posts.findIndex(p => p.id === id)
    //     if (index !== -1) {
    //         db.posts = db.posts.map(el => el.id === id ? {...el, ...req, blogName: blogName?.name} : el)
    //         return db.posts[index]
    //     }
    //     return null
    // }
    async cleanPostsDB(): Promise<boolean> {
        const result = await client.db('blogPlatform').collection('posts').deleteMany({})
        return result.deletedCount === 1
    }
}