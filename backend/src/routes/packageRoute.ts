import express,{Router} from 'express'
import errorHandler from '../services/catchAsyncError'
import authMiddleWare, { Role } from '../middleware/authMiddleWare'
import packageController from '../controller/packageController'

const router:Router=express.Router()

router.route("/package")
.get(packageController.getAllPackage)





export default router