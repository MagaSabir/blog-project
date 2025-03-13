import {db} from "../db/db";

export const postRepository = {
    findPost() {
        return db.posts
    },
    findPostById(id: string) {
        const post = db.posts.find(v => v.id === id)
        return post
    },

    createPost(req: any) {
        const newPost: any = {
            id: Math.floor(Date.now() + Math.random()).toString(),
            title: req.title,
            shortDescription: req.shortDescription,
            content: req.content,
            blogId: 'd',
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
        const index = db.posts.findIndex(p => p.id === id)
        if (index !== -1) {
            db.posts = db.posts.map(el => el.id === id ? {...el, ...req, blogName: ';'} : el)
            return db.posts[index]
        }
        return null
    }
}