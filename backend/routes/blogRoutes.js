import express from "express"
import authMiddleware from "../middleware/authMiddleware.js";
import { authorBlogs, blog, blogBySlug, blogs, create, deleteBlog, myBlogs, searchBlogs, update } from "../controller/blogController.js";
import fileUploadMiddleware from "../middleware/fileUploadMiddleware.js";

const blogRouter = express.Router();

blogRouter.get('/blogs',blogs)
blogRouter.get('/blogs/author/:id',authorBlogs)
blogRouter.get('/blogs/search/:search',searchBlogs)
blogRouter.get('/blog/:id',authMiddleware,blog) // blog author access this route
blogRouter.get('/blog-slug/:slug',blogBySlug)
blogRouter.get('/my-blogs',authMiddleware,myBlogs)
blogRouter.post('/create-blog',[authMiddleware,fileUploadMiddleware.single('image')],create)
blogRouter.put('/update-blog/:id',[authMiddleware,fileUploadMiddleware.single('image')],update)
blogRouter.delete('/delete-blog/:id',authMiddleware,deleteBlog)

export default blogRouter