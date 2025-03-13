import {db, dbBlogType} from "../db/db";

export const blogRepository = {
    findBlog() {
        return db.blogs
    },

    findBlogById(id: string) {
        let blog = db.blogs.find(v => v.id === id)
        return blog
    },

    createBlog(req: any) {
        const newBlog = {
            id: Math.floor(Date.now() + Math.random()).toString(),
            name: req.name,
            description: req.description,
            websiteUrl: req.websiteUrl
        }
        db.blogs.push(newBlog)
        return newBlog
    },
    updateBlog(id: any, req: any) {

        const index = db.blogs.findIndex(p => p.id === id)
        if (index !== -1) {
            db.blogs = db.blogs.map(el => el.id === id ? {...el, ...req} : el)
            return db.blogs[index]
        }
        return null
    },

    deleteById(id: string): any {
        const index = db.blogs.findIndex(v => v.id === id)

        if (index !== -1) {
            db.blogs.map((el => el.id === id ? db.blogs.splice(index, 1) : null))
            // return db.blogs.splice(index, 1)
        }
        return null
    }
}