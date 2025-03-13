import {SETTINGS} from "../src/settings";
import {req} from "./test-helpers";
import {db} from "../src/db/db";


const newBlog = [
    {
        id: Math.floor(Date.now() + Math.random()).toString(),
        name: 'name',
        description: 12,
        websiteUrl: "https://blabla.com"
    },
    {
        id: Math.floor(Date.now() + Math.random()).toString(),
        name: 'ssss',
        description: 'string',
        websiteUrl: "https://blabla.com"
    }
];
//describe(name, fn) группирует связанные по логике тесты в один блок.
describe('/blogs', ()=> {
    //метод test запускает тест(Первый аргумент — имя теста; второй аргумент — функция, содержащая ожидания для тестирования)
    it('should get empty array', async () => {
       db.blogs = []

        const res = await req
            .get(SETTINGS.PATH.blogs)
            .expect(200) // Функция expect используется каждый раз, когда вы хотите проверить значение
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBe(0)
    })

    it.each([newBlog[0]])('should return 400 if some required field is missing or not string', async (invalidData) => {
        const res = await req
            .post(SETTINGS.PATH.blogs)
            .send(invalidData)
            .expect(400);

        expect(res.body.errorMessages).toBeDefined();
        expect(Array.isArray(res.body.errorMessages)).toBe(true);
        expect(res.body.errorMessages.length).toBeGreaterThan(0);
    });

    it.each([newBlog[1]])('should return 204 if the request was successful', async (validData) => {
        const res = await req
            .put('/blogs/:id')
            .send(validData)
            .expect(204);
    });

    it.each([newBlog[0]])('should return 404 if some required field is missing or not a string', async (validData) => {
        const res = await req
            .put(SETTINGS.PATH.blogs + '/:id')
            .send(validData)
            .expect(400)

        console.log(res.body.errorMessages)
        expect(res.body.errorMessages).toBeDefined();
        expect(Array.isArray(res.body.errorMessages)).toBe(true)
        expect(res.body.errorMessages.length).toBeGreaterThan(0)
    })
})

describe('/posts', () => {
    it('should return empty array', async () => {
        db.posts = []
        const res = await req
            .get('/posts')
            .expect(200)
        expect(Array.isArray(res.body)).toBe(true)
        expect(res.body.length).toBe(0);
    })

})

