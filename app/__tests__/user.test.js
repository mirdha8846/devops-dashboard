import app from "../index.js"
import request from "supertest"


describe("nodejs api-testing",()=>{
    it("GET /api/login testing",async()=>{
        const res= await request(app).get('/api/login')
         expect(res.statusCode).toBe(200);
         expect(res.body.status).toBe("ok")
         expect(res.body.message).toBe('User logged in successfully')

    })
     it("GET /api/orders testing",async()=>{
        const res= await request(app).get('/api/orders')
         expect(res.body.orderId).toBe('ORD123');
         expect(res.body.status).toBe('Delivered')
         expect(res.body.amount).toBe(499)

    })
    it("GET /api/products testing", async () => {
        const res = await request(app).get('/api/products')
         expect(res.statusCode).toBe(200);
       expect(res.body.length).toBeGreaterThan(0);

    })

})