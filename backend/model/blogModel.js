import mongoose from "mongoose";

const BlogScheme = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    slug:{
        type:String,
        required:true,
        unique:true,
    },
    shortDescription:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    featureImage:{
        type:String,
        required:true,
    },
    published:{
        type:Boolean,
        required:true,
        default:true,
    }
})
// BlogScheme is a blueprint
//Mongoose  convert "Blog" into the blogs automatically which is a collection name.
export default mongoose.model("Blog",BlogScheme)