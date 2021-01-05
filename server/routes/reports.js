import * as reportController from '../controllers/reportController'

import * as express from "express";
import { Router } from "express";
import {auth, restrictRoles} from '../middleware/authMid'

const router = Router();

//all routes start with /api/reports

// @route GET /api/reports
// get all ureport 
// access public 

router.get("/", reportController.getAllReports)

// @route GET /api/reports/:id
// get all single report 
// access public 

router.get("/:id", reportController.getSingleReport)

// @route Post /api/reports/
// create new report  
// access user/admin

router.post("/", auth, reportController.createReport)

// @route PUT /api/reports/:id (:id of report)
// update report -add comments
// access user & admin

router.put("/:id",  reportController.updateReport)

// @route PUT /api/reports/admin/:id (is the report :id not the admin)
// update report  with admin privileges 
// access admin

router.put("/admin/:id",  reportController.adminUpdateReport)


// @route DELETE /api/reports/:id (is the report :id not the admin)
// soft delete report  
// access admin

router.put("/:id", reportController.deleteReport)



export default router 