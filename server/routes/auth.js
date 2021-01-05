import * as authController from '../controllers/authController'
import {auth} from '../middleware/authMid'

import { Router } from "express";

const router = Router();

// all routes start with /api/auth

// @route POST /api/auth/login
// authenticate user / login
// access Public

router.post("/login", authController.loginUser)

// @route GET /api/auth/user
// verify the logged in user
// access user user/admin

router.get("/user", auth, authController.verifyUser)





export default router 
