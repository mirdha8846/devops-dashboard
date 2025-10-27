import { requestCounter,requestDuration } from "../utils/prometheusClient.js";

export const trackRecord=(req,res,next)=>{
const start=Date.now()
res.on("finish",()=>{
    const duration=(Date.now()-start)/1000
    requestCounter.inc({method:req.method,route:req.path,status_code:res.statusCode})
    requestDuration.observe({method:req.method,route:req.path,status_code:res.statusCode},duration)
})
next()
}