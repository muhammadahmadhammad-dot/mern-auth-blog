import express from "express"
import { login, register,usersName } from "../controller/userController.js";
import authMiddleware from "../middleware/authMiddleware.js"

const router = express.Router();

router.get("/all-users-name",usersName)
router.post("/login-check",login) 
router.post("/register",register)
router.get("/profile",authMiddleware, (req, res)=>{
    return res.json(req.user) // req.user  set by  middleware
})
router.post("/logout",authMiddleware,(req,res)=>{
    return res.status(200).json({msg:"Logout successfully"})
})
export default router;