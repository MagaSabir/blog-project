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
        let idbl: any = db.blogs.map(el => el.id)
        let blogName = db.blogs.find((el) => el.id === idbl[idbl.length - 1])

        const newPost: any = {
            id: Math.floor(Date.now() + Math.random()).toString(),
            title: req.title,
            shortDescription: req.shortDescription,
            content: req.content,
            blogId: idbl[idbl.length - 1],
            blogName: blogName?.name
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