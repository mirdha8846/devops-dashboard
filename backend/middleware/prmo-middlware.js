import { requestCounter,requestDuration ,activeRequest} from "../utils/prometheusClient.js";

export const trackRecord=(req,res,next)=>{
const start=Date.now()
activeRequest.inc()
res.on("finish",()=>{
    activeRequest.dec()
    const duration=(Date.now()-start)/1000
    requestCounter.inc({method:req.method,route:req.path,status_code:res.statusCode})
    requestDuration.observe({method:req.method,route:req.path,status_code:res.statusCode},duration)
})
next()
}