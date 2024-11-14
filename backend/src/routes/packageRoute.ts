import express,{Router} from 'express'
import packageController from '../controller/packageController'

const router:Router=express.Router()

router.route("/package")
.get(packageController.getAllPackage)





export default router