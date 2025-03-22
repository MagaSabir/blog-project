import {client} from "../db/mongodb";

export const cleanDbRepository = {
    async cleanAllDB(): Promise<undefined> {
        const blogsResult = await client.db('blogPlatform').collection('blogs').deleteMany({})
        const postsResult = await client.db('blogPlatform').collection('posts').deleteMany({})
    }
}