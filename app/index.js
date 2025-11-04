import express from 'express'
import cors from 'cors'
import metricRoute from "./routes/metric.route.js"
import fakeRoutes from "./routes/fake.routes.js"
import { trackRecord } from './middleware/prmo-middlware.js'
import { register } from './utils/prometheusClient.js'
import dotenv from 'dotenv'
dotenv.config(
  {
    file:"./secret/.env"
  }
)
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



app.listen(process.env.PORT, () => console.log("server is running on port 3002"))


export default app