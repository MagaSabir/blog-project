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
        // const blog = db.blogs.find(v => v.id === id)
        // if(blog) {
        //     blog.id
        // }
        db.blogs = db.blogs.map(p => {
            if (p.id === id) {
                p.name = req.name;
                p.description = req.description;
                p.websiteUrl = req.websiteUrl
            }
            return p
        })

    },

    deleteById(id: string): any {
        const index = db.blogs.findIndex(v => v.id === id)
        if(index !== -1) {
            return db.blogs.splice(index, 1)
        }
        return null
    }
}