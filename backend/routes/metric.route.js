import {Router} from "express"
import {cpu,pods,memo,deployment,httpRequests,allMetrics} from "../controller/metric.controller.js"
const route=Router()

route.get("/cpu",cpu)
route.get("/memorary",memo)
route.get("/pods",pods)
route.get("/deployment",deployment)
route.get("/http-requests",httpRequests)  // New: Local dev metrics
route.get("/all-metrics",allMetrics)      // New: See all available metrics
export default route