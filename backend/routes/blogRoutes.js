import express from "express"
import authMiddleware from "../middleware/authMiddleware.js";
import { blog, create, myBlogs, update } from "../controller/blogController.js";

const blogRouter = express.Router();

blogRouter.get('/my-blogs',authMiddleware,myBlogs)
blogRouter.post('/create-blog',authMiddleware,create)
blogRouter.get('/blog/:id',authMiddleware,blog)
blogRouter.put('/update-blog/:id',authMiddleware,update)
blogRouter.delete('/delete-blog/:id',authMiddleware,deleteBlog)

export default blogRouter