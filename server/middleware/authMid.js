import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import User from '../models/userModel'

dotenv.config();
const jwtSecret = process.env.JWT_SECRET;

export function auth(req, res, next) {
  
    //get token
    const token = req.header("x-auth-token");
    if (!token)
      return res.status(401).json({ msg: "No token- authorization denied" });
    
    try {
      //verify token
    const decoded = jwt.verify(token, jwtSecret);

    
    //add user from payload
    req.user = decoded;
    next()
  } catch (e) {
    res.status(400).json({ msg: 'Token is not valid' });
  }
}

export function restrictRoles(...roles){
    
    return  async (req, res, next) => {

        const user = await User.findById(req.user.id).select('-password')

        
        if (!roles.includes(user.role)) {
          return next( res.status(403).json({msg:'User does not have permission to perform this action'})
          );
        }
    
        next();
      };
    };