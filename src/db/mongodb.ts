import {MongoClient} from "mongodb";

const mongoUri = process.env.MONGO_URL || "mongodb://0.0.0.0:27017";

export const client = new MongoClient(mongoUri)

export async function runDb() {
    try {
        await client.connect();
        await client.db("blogs").command({ping: 1});
        console.log("Connected successfully to mongo server")
    } catch {
        await client.close()
    }
}