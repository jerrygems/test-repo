const request = require("supertest")
const {app,redisClient,pgPool} =require("../index.js")

describe('test api',()=>{
    beforeEach(async ()=>{
        global.test = 111
        console.log(global.test)
    })
    it('testing the get api for now',async ()=>{
        const res = await request(app).get('/hey')
        expect(res.status).toBe(200)
        expect(res.body.message).toBe('hey there')
    })
    afterAll(async ()=>{
        await redisClient.quit();
        await pgPool.end();
    })
})