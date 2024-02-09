import { Course } from "../models/Course.js";

import { catchAsyncError } from "../middlewares/catchAsyncError.js";

import ErrorHandler from "../utils/errorHandler.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "cloudinary";
 
export const getAllCourses = catchAsyncError(async(req,res,next)=>{
    const courses = await Course.find().select("-Leactures");
    res.status(200).json({
        success : true,
        courses,

    });
})

export const createCourse = catchAsyncError(async(req,res,next)=>{
    const { title, description, category, createdBy } = req.body;

    if (!title || !description || !category || !createdBy)
        return next(new Error("Please fill all fields",400));

    const file = req.file;
    const fileUri = getDataUri(file);
    const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);

    await Course.create({
        title, 
        description, 
        category, 
        createdBy, 
        poster:{
            public_id : mycloud.public_id,
            url : mycloud.secure_url,
        },
    })


    res.status(201).json({
        success : true,
        message : "Course created successfully. You can add leactures now...",

    });
})


export const getCourseLeactures = catchAsyncError(async(req,res,next)=>{
    const course = await Course.findById(req.params.id);

    if (!course) return next(new ErrorHandler("Course Not Found",404));

    course.views += 1;

    await course.save();

    res.status(200).json({
        success : true,
        leactures : course.leactures,

    });
})

export const addLeacture = catchAsyncError(async(req,res,next)=>{

    const { id } = req.params;

    const { title , description } = req.body;

    const course = await Course.findById(id);

    if (!course) return next(new ErrorHandler("Course Not Found",404));

    //upload file here
    
    const file = req.file;
    const fileUri = getDataUri(file);
    const mycloud = await cloudinary.v2.uploader.upload(fileUri.content,{
        resource_type : "video"
    });

    course.leactures.push({
        title,
        description,
        video:{
            public_id : mycloud.public_id,
            url : mycloud.secure_url,
        },
    })

    course.views += 1;

    course.numOfVideos = course.leactures.length;

    await course.save();

    res.status(200).json({
        success : true,
        message : "Leacture Added in Course",

    });
})



export const deleteCourse = catchAsyncError(async(req,res,next)=>{
    const { id } = req.params;
    const course = await Course.findById(id);
    if (!course) return next(new ErrorHandler("Course Not Found",404));

    await cloudinary.v2.uploader.destroy(course.poster.public_id);

    for(let i=0; i<course.leactures.length;i++){
        const singleLeacture = course.leactures[i];

        await cloudinary.v2.uploader.destroy(singleLeacture.video.public_id,{
            resource_type:"video",
        });
    }

    await course.deleteOne();

    res.status(200).json({
        success : true,
        message : "Course Deleted successfully...",

    });
})


export const deleteLecture = catchAsyncError(async(req,res,next)=>{
    const { courseID , lectureID } = req.query;
    const course = await Course.findById( courseID );
    if (!course) return next(new ErrorHandler("Course Not Found",404));

    const lecture = course.leactures.find((item)=>{
        if(item._id.toString() ===  lectureID.toString()) return item;
    });

    await cloudinary.v2.uploader.destroy(lecture.video.public_id,{
        resourse_type : "video",
    });

    course.leactures = course.leactures.filter((item)=>{
        if(item._id.toString() !==  lectureID.toString()) return item;
    });

    course.numOfVideos = course.leactures.length;


    await course.save();

    res.status(200).json({
        success : true,
        message : "Lecture Deleted successfully...",

    });
})
