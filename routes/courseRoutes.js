import express from "express";

import { createCourse, getAllCourses , getCourseLeactures , addLeacture , deleteCourse , deleteLecture} from '../controllers/courseController.js';

import singleUpload from "../middlewares/multer.js";

import {isAuthenticated ,authorizeAdmin} from "../middlewares/auth.js"

const router = express.Router();

//get all courses without leactures
router.route("/courses").get(getAllCourses);

//create new course only admin
router.route("/createcourse").post(isAuthenticated ,authorizeAdmin , singleUpload , createCourse);

//add leacture , delete course , get course details
router.route("/course/:id").get(isAuthenticated , getCourseLeactures)
.post( isAuthenticated, authorizeAdmin, singleUpload , addLeacture)
.delete(isAuthenticated ,authorizeAdmin, deleteCourse);

//delete leactures
router.route("/lecture").delete(isAuthenticated ,authorizeAdmin , deleteLecture);

export default router;