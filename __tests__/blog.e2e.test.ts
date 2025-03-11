import {SETTINGS} from "../src/settings";
import {req} from "./test-helpers";
import {db} from "../src/db/db";

const newBlog = [{
    id: Math.floor(Date.now() + Math.random()).toString(),
    name: 'string',
    description: 'string',
    websiteUrl: "https://blabla.com"
}
]

describe('/blogs', ()=> {
    it('should get empty array', async () => {
        db.blogs = []

        const res = await req
            .get(SETTINGS.PATH.blogs)
            .expect(200) // проверяем наличие эндпоинта

    })

})