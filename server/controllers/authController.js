import User from '../models/userModel'
import bcrypt from 'bcryptjs'

import dotenv from 'dotenv';
import jwt from 'jsonwebtoken'

dotenv.config();
const jwtSecret = process.env.JWT_SECRET

export const loginUser = async (req, res) => {
    
    try {
         const {email, password} = req.body
  
         //simple validation
         if(!email || !password)
          return res.status(400).json({msg:'Please enter all fields'})
        
          // look for duplicate emails 
          const foundUser = await User.findOne({email})
         
          if (!foundUser) return res.status(400).json({msg: 'User does not exist'})
          
          //validate password
         const match = await bcrypt.compare(password, foundUser.password)
        
         if(!match) return res.status(400).json({msg: 'Invalid credentials'})
 
         const token = jwt.sign({id: foundUser._id}, jwtSecret, {expiresIn: 14400})
         if (!token) throw Error('Error with getting JWT')
 
           res.json({
               actionCompeleted: "User authenticated",
               token,
               user: {
               id: foundUser._id,
               name: foundUser.name,
               email: foundUser.email,
               role: foundUser.role
             }
         })
 
 
     } catch(e){
         res.status(400).json({ error: e.message });
     }
 
 
 };

 export const verifyUser = async (req, res) => {
     console.log('running verifyUser')
    try{
        const user = await User.findById(req.user.id).select('-password')
        if(!user) throw Error('User could not be verified')
        res.json(user)

    } catch (e){
        res.status(400).json({ error: e.message });
    }
 }