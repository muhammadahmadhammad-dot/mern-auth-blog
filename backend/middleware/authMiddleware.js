import jwt, { decode } from "jsonwebtoken";
import User from "../model/userModel.js"

const authMiddleware = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization || !authorization.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Not Authenticated" });
    }
    const token = authorization.split(" ")[1]; //getting /extract token
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Invalid Token" });
      }

      const user = await User.findOne({ _id: decoded.id });
      if(!user){
        return res.status(401).json({ error: "User Not Found" });
      }
      req.user = {
        id:user._id,
        fname:user.fname,
        lname:user.lname,
        email:user.email,
      }
      next();
    });
  } catch (error) {
    console.log("Auth Middleware Error : ", error);
    return res.status(500).json({ error: error });
  }
};


export default authMiddleware;