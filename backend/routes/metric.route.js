import {Router} from "express"
import {cpu,pods,memo} from "../controller/metric.controller.js"
const route=Router()

route.get("/cpu",cpu)
route.get("/memorary",memo)
route.get("/pods",pods)

export default route