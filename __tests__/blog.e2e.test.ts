import {SETTINGS} from "../src/settings";
import {req} from "./test-helpers";
import {db, errorsArray} from "../src/db/db";
import random from 'random-string-generator'

describe('/posts', () => {
    db.posts = []
    it('should return empty array', async () => {
        const res = await req
            .get(SETTINGS.PATH.posts)
            .send(db.posts)
            .expect(200)
        expect(res.body).toEqual([])
        console.log(res.body)
    })

    it('shouldn\'t create', async () => {
        const newPost = {
            title: random(31),
            content: random(1001),
            shortDescription: random(101),
            blogId: '12',
        }
        const buff = Buffer.from(SETTINGS.ADMIN_AUTH, 'utf8')
        const codedAuth = buff.toString('base64')
        const res = await req
            .post(SETTINGS.PATH.posts)
            .set({'Authorization': 'Basic ' + codedAuth})
            .send(newPost) // отправка данных
            .expect(400)

        expect(res.body.errorsMessages.length).toEqual(4)
        expect(res.body.errorsMessages[0].field).toEqual('title')
        expect(res.body.errorsMessages[1].field).toEqual('shortDescription')
        expect(res.body.errorsMessages[2].field).toEqual('content')
        expect(res.body.errorsMessages[3].field).toEqual('blogId')
        expect(db.posts.length).toEqual(0)
        console.log(res.body.errorsMessages)
    })

    it('should create and return new post', async () => {
        const newPost = {
            id: '12',
            title: random(5),
            content: random(10),
            shortDescription: random(10),
            blogId: '1'
        }
        const buff = Buffer.from(SETTINGS.ADMIN_AUTH, "utf8")
        const codeAuth = buff.toString("base64")
        const res = await req
            .post(SETTINGS.PATH.posts)
            .set({'Authorization': 'Basic ' + codeAuth})
            .send(newPost)
            .expect(201)
        expect(res.body.title).toEqual(newPost.title)
        console.log(newPost)
    })

})