import {db} from "../db/db";
import {blogRepository} from "./blog-repository";
import {body} from "express-validator";

export const postRepository = {
    findPost() {
        return db.posts
    },
    findPostById(id: string) {
        return db.posts.find(v => v.id === id)
    },

    createPost(req: any) {
        let blog = blogRepository.findBlog().find((el => el.id))

        const newPost: any = {
            id: Math.floor(Date.now() + Math.random()).toString(),
            title: req.title,
            shortDescription: req.shortDescription,
            content: req.content,
            blogId: blog?.id,
            blogName: blog?.name
        }
        db.posts.push(newPost)
        return newPost

    },

    deleteById(id: string): any {
        const index = db.posts.findIndex(v => v.id === id)
        if (index !== -1) {
            return db.posts.splice(index, 1)
        }
        return null
    },

    updatePost(id: string, req: any): any {
        let blogId: any = db.blogs.map(el => el.id)
        let blogName = db.blogs.find((el) => el.id === blogId[blogId.length - 1])
        const index = db.posts.findIndex(p => p.id === id)
        if (index !== -1) {
            db.posts = db.posts.map(el => el.id === id ? {...el, ...req, blogName: blogName?.name} : el)
            return db.posts[index]
        }
        return null
    }
}