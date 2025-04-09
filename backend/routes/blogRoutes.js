import express from "express"
import authMiddleware from "../middleware/authMiddleware.js";
import { authorBlogs, blog, blogs, create, deleteBlog, myBlogs, searchBlogs, update } from "../controller/blogController.js";

const blogRouter = express.Router();

blogRouter.get('/blogs',blogs)
blogRouter.get('/blogs/author/:id',authorBlogs)
blogRouter.get('/blogs/search/:search',searchBlogs)
blogRouter.get('/blog/:id',blog)
blogRouter.get('/my-blogs',authMiddleware,myBlogs)
blogRouter.post('/create-blog',authMiddleware,create)
blogRouter.put('/update-blog/:id',authMiddleware,update)
blogRouter.delete('/delete-blog/:id',authMiddleware,deleteBlog)

export default blogRouter