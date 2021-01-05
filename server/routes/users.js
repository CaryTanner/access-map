import * as userController from '../controllers/userController'
import {auth, restrictRoles} from '../middleware/authMid'

import { Router } from "express";

const router = Router();

//all routes start with /api/users


// @route GET /api/users
// get all users 
// access Admin 

router.get("/", auth, restrictRoles("Admin"),  userController.getAllUsers)

// @route GET /api/users/:id
// get all single user 
// access User & Admin 

router.get("/user", auth, userController.getSingleUser)

// @route Post /api/users/register
// create new user  
// access public

router.post("/register", userController.createUser)

// @route PUT /api/users/:id (:id of logged in user)
// update user (user update self)
// access user & admin

router.put("/user/update", auth, userController.updateUser)

// @route PUT /api/users/password/:id (:id of logged in user)
// update user (user update self)
// access user & admin

router.put("/user/password", auth, userController.updateUserPassword)

// @route PUT /api/users/admin/:id (is the user :id not the admin)
// update user to admin privileges 
// access admin

router.put("/user/adminupdate", auth, restrictRoles("Admin"), userController.adminUpdateUser)


// @route DELETE /api/users/:id (is the user :id not the admin)
// soft delete user  
// access user & admin

router.put("/user/delete", auth, userController.deleteUser)




export default router 
