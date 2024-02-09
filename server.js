import app from "./app.js";

import { connectDB } from "./config/database.js";

import cloudinary from "cloudinary";

cloudinary.v2.config({
    cloud_name : process.env.CLOUDINARY_CLIENT_NAME,
    api_key : process.env.CLOUDINARY_CLIENT_API,
    api_secret : process.env.CLOUDINARY_CLIENT_SECRET
})

connectDB();

app.listen(process.env.PORT,()=>{
    console.log(`server is working on port ${process.env.PORT}`);
});