import express from "express";

import { register , login , logout , getMyProfile , changePassword, updateProfile , 
            updateProfilePicture , forgetPassword, resetPassword, addToPlaylist , removeFromPlaylist} from "../controllers/userController.js";


import {isAuthenticated} from "../middlewares/auth.js"

const router = express.Router();

//to register a new user
router.route("/register").post(register);

//login
router.route("/login").post(login);

//logout
router.route("/logout").get(logout);

//get my profile
router.route("/me").get(isAuthenticated , getMyProfile);

//change password
router.route("/changepassword").put(isAuthenticated , changePassword);

//update profile
router.route("/updateprofile").put(isAuthenticated , updateProfile);

//update profile Picture
router.route("/updateprofilepicture").put(isAuthenticated , updateProfilePicture);

//forget password
router.route("/forgetpassword").post(forgetPassword);

//reset password
router.route("/resetpassword/:token").put(resetPassword);

//add to playlist
router.route("/addtoplaylist").post(isAuthenticated , addToPlaylist );

//remove from playlist
router.route("/removefromplaylist").delete(isAuthenticated , removeFromPlaylist );

export default router;