import blogModel from "../model/blogModel";
import { blogValidatedScheme } from "../validation/blogValidate";

export const blogs = async (req, res) => {
  try {
    const blogs = await blogModel.find();
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
export const create = async (req, res) => {
  try {
    const { data, error } = blogValidatedScheme.safeParse(req.body);
    if (error) {
      return res.status(400).json({ errors: error.format() });
    }
    const validated = data;
    const newBlog = new blogModel({
      title: validated.title,
      shortDescription: validated.shortDescription,
      description: validated.description,
      userId: req.user.id,
    });
    const saveBlog = await newBlog.save();

    return res
      .status(201)
      .json({ msg: "Blog Saved successfully", blog: saveBlog });
  } catch (error) {
    return res.status(500).json({ error: `error : ${error}` });
  }
};
export const blog = async (req,res) => {
    try {
        const {id} = req.params;
        const blog = await blogModel.findOne({_id:id});
        if(!blog){
            return res.status(404).json({ message: "Not found"}); 
        }
        return res.status(200).json({ message: "Your Blog", blog}); 
    
      } catch (error) {
        return res.status(500).json({ error: `error : ${error}` });
      }
};
export const update = async (req,res) => {};
export const deleteBlog = async (req,res) => {
    try {
        const {id} = req.params;
        const userId = req.user.id;
        const blog = await blogModel.findOneAndDelete({_id:id,userId});
        if(!blog){
            return res.status(404).json({ message: "Not found"}); 
        }
        return res.status(200).json({ message: "Your Blog is deleted.", blog}); 
    
      } catch (error) {
        return res.status(500).json({ error: `error : ${error}` });
      }
};
