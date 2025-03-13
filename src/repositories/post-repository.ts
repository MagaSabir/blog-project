import {db} from "../db/db";
import {blogId, blogName} from "../routes/blogs/blogRoutes";

export const postRepository = {
    findPost() {
        return db.posts
    },
    findPostById(id: string) {
        const post = db.posts.find(v => v.id === id)
        return post
    },

    createPost(req: any) {
        const newPost = {
            id: Math.floor(Date.now() + Math.random()).toString(),
            title: req.title,
            shortDescription: req.shortDescription,
            content: req.content,
            blogId: blogId,
            blogName: blogName
        }
        db.posts.push(newPost)
        console.log(blogId)
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
        db.posts.map(p => {
            if (p.id === id) {
                p.title = req.title;
                p.shortDescription = req.shortDescription;
                p.content = req.content
                p.blogId = blogId
            }
            return p
        })
    }
}