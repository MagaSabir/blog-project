import {client} from "../db/mongodb";

export const cleanDbRepository = {
    async cleanAllDB(): Promise<undefined> {
        await client.db('blogPlatform').collection('blogs').deleteMany({})
        await client.db('blogPlatform').collection('posts').deleteMany({})
    }
}