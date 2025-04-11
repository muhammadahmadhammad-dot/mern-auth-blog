import blogModel from "../model/blogModel.js";
import userModel from "../model/userModel.js";
import { blogValidatedScheme } from "../validation/blogValidate.js";

export const blogs = async (req, res) => {
  try {
    const blogs = await blogModel.find({published:true});
    if(!blogs || blogs.length == 0){
        return res.status(404).json({ message: "Not found", blogs:[] }); 
    }
    return res.status(200).json({ message: "All Blogs", blogs}); 

  } catch (error) {
    return res.status(500).json({ error: `error : ${error}` });
  }
};
export const myBlogs = async (req, res) => {
  try {
    const userId = req.user.id;
    const blogs = await blogModel.find({userId});
    if(!blogs || blogs.length == 0){
        return res.status(404).json({ message: "Not found", blogs:[] }); 
    }
    return res.status(200).json({ message: "Your Blogs", blogs}); 

  } catch (error) {
    return res.status(500).json({ error: `error : ${error}` });
  }
};
export const searchBlogs = async (req, res) => {
  try {
    const {search} = req.params; //search item
    // $regex allows partial and case-insensitive matching ($options: 'i').
    // $or check any of the given fields for match.
    const blogs = await blogModel.find({
      $or: [
        { title: { $regex: search, $options: 'i' } },
        { shortDescription: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ],
      published:true
    });
    if(!blogs || blogs.length == 0){
        return res.status(404).json({ message: "Not found", blogs:[] }); 
    }
    return res.status(200).json({ message: `Search Blogs`, blogs}); 

  } catch (error) {
    return res.status(500).json({ error: `error : ${error}` });
  }
};
export const authorBlogs = async (req, res) => {
  try {
    const {id} = req.params; //author id
    const user = await userModel.find({_id:id}).select('_id fname lname');
    if (!user) {
      return res.status(404).json({ message: "Author not found"}); 
    }
    const blogs = await blogModel.find({userId:id,published:true});
    if(!blogs || blogs.length == 0){
        return res.status(404).json({ message: "Not found", blogs:[] }); 
    }
    return res.status(200).json({ message: `Author Blogs`, blogs,user}); 

  } catch (error) {
    return res.status(500).json({ error: `error : ${error}` });
  }
};
export const create = async (req, res) => {
  try {
    const { data, error } = blogValidatedScheme.safeParse(req.body);
    if (error) {
      return res.status(400).json({ errors: error.format() });
    }
    const validated = data;
    const image = req.file
    const newBlog = new blogModel({
      title: validated.title,
      slug: validated.slug,
      shortDescription: validated.shortDescription,
      description: validated.description,
      userId: req.user.id,
      featureImage:image.filename,
      published: validated.published,
    });
    const saveBlog = await newBlog.save();

    return res
      .status(201)
      .json({ message: "Blog Saved successfully", blog: saveBlog });
  } catch (error) {
    return res.status(500).json({ error: `error : ${error}` });
  }
};
export const blog = async (req,res) => {
    try {
        const {id} = req.params;
        const userId = req.user.id;
        const blog=await blogModel.findOne({_id:id});
        
        if(!blog){
          return res.status(404).json({ message: "Not found"}); 
        }

        if( userId && blog.userId.toString() == userId){
          return res.status(200).json({ message: "Your Blog", blog}); 
        }
        
        return res.status(404).json({ message: "Not found"}); 
   
        
    
      } catch (error) {
        return res.status(500).json({ error: `error : ${error}` });
      }
};
export const blogBySlug = async (req,res) => {
    try {
        const {slug} = req.params;
        if (!slug) {
          return res.status(400).json({ message: "Slug is required" });
      }
        const blog=await blogModel.findOne({ slug: slug });
        
        if(!blog){
          return res.status(404).json({ message: "Not found"}); 
        }

          return res.status(200).json({ message: "Your Blog", blog}); 
      
   
        
    
      } catch (error) {
        return res.status(500).json({ error: `error : ${error}` });
      }
};
export const update = async (req,res) => {
  try {

    const {id} = req.params;
    const userId = req.user.id;
    const { data, error } = blogValidatedScheme.safeParse(req.body);
    if (error) {
      return res.status(400).json({ errors: error.format() });
    }
    const findBlog = await blogModel.findOne({_id:id,userId});
    if(!findBlog){
      return res.status(404).json({ message: "Not found"}); 
  }
    if (req.file) {
      data.featureImage = req.file.filename; 
    }
    const blog = await blogModel.findOneAndUpdate({_id:id},data,{ new: true });
    
    return res.status(200).json({ message: "Your Blog is updated successfully", blog}); 

  } catch (error) {
    return res.status(500).json({ error: `error : ${error}` });
  }
};
export const deleteBlog = async (req,res) => {
    try {
        const {id} = req.params;
        const userId = req.user.id;
        const blog = await blogModel.findOne({_id:id,userId});
        console.log(blog)
        if(!blog){
            return res.status(404).json({ message: "Not found"}); 
        }
        await blogModel.findByIdAndDelete(blog._id)
        return res.status(200).json({ message: "Your Blog is deleted.", blog}); 
    
      } catch (error) {
        return res.status(500).json({ error: `error : ${error}` });
      }
};
