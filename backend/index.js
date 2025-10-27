import express from 'express'
import cors from 'cors'
import metricRoute from "./routes/metric.route.js"
const app=express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

app.use('/metric',metricRoute)
app.listen(3002,()=>console.log("server is running "))