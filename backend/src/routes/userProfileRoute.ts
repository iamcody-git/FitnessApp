import express,{Router} from 'express'
import errorHandler from '../services/catchAsyncError'
import authMiddleWare, { Role } from '../middleware/authMiddleWare'
import userProfileController from '../controller/userProfileController'
const router:Router=express.Router()

router.route("/customer/userprofile/register")
.post(authMiddleWare.isAuthenticated,authMiddleWare.resetrictTo(Role.CUSTOMER),errorHandler(userProfileController.createUserProfile))

router.route("/admin/userProfile")
.get(authMiddleWare.isAuthenticated,authMiddleWare.resetrictTo(Role.ADMIN),errorHandler(userProfileController.getAllUserProfile))






export default router