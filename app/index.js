import express from 'express'
import cors from 'cors'
import metricRoute from "./routes/metric.route.js"
import fakeRoutes from "./routes/fake.routes.js"
import { trackRecord } from './middleware/prmo-middlware.js'
import { register } from './utils/prometheusClient.js'
const app=express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(trackRecord)
app.use("/api",fakeRoutes)
app.use('/data',metricRoute)

app.get("/metrics",async(req,res)=>{
    res.set('Content-Type', register.contentType)
  res.end(await register.metrics())
})

// Only start server if not in test environment
if (process.env.NODE_ENV !== 'test') {
  app.listen(3002, () => console.log("server is running on port 3002"))
}

export default app