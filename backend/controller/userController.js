import User from "../model/userModel.js";
import bycrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { loginScheme, registerScheme } from "../validation/authValidate.js";


export const usersName = async (req, res) => {
  try {


    const users =await User.find().select('_id fname lname');
    if(!users  || users.length === 0){
      return res
      .status(400)
      .json({ error: "Users Not Found!" });
    }
    return res
      .status(201)
      .json({ messages: "All Users Name!", users: users });
  } catch (error) {
    return res.status(500).json({ error: `error : ${error}` });
  }
}
export async function register(req, res) {
  try {
    const {data, error} = registerScheme.safeParse( req.body)

    if(error){
      return res
      .status(400)
      .json({ errors: error.format() });
    }

    const {fname,lname, email, password} = data;
    const hash = await bycrypt.hash(password,10)

    const newData = new User({fname,lname, email, password:hash});
    const user = await newData.save();
    return res
      .status(201)
      .json({ msg: "Your are register successfully!", user: user });
  } catch (error) {
    return res.status(500).json({ error: `error : ${error}` });
  }
}

export async function login(req, res) {
  try {
    const {data, error} = loginScheme.safeParse(req.body);
    if(error){
      return res
      .status(400)
      .json({ errors: error.format() });
    }

    const { email, password } = data;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid Credentials." });
    }
    const hash = await bycrypt.compare(password, user.password)
    if (!hash) {
      return res.status(400).json({ error: "Invalid Credentials." });
    }
    const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn:'1d'});
    
    return res.status(200).json({ msg: "Login Successfully",token:token,user:{
      id:user._id,
      fname:user.fname,
      lname:user.lname,
      email:user.email,
    } });
  } catch (error) {
    return res.status(500).json({ error: `error : ${error}` });
  }
}
