import mongoose from "mongoose";

const schema = new mongoose.Schema({
    title : {
        type : String,
        required : [true,"please enter course title"],
        minLength : [4,"title length must be atleast 4  characters"],
        maxLength : [80,"title length should be less than 80 characters"],
    },
    description : {
        type : String,
        required : [true,"please enter course title"],
        minLength : [20,"description length must be atleast 4  characters"],
        
    },

    leactures : [{
        title : {
            type : String,
            required : true,
        },
        description : {
            type: String,
            required : true,
        },
        video : {
            public_id : {
                type : String,
                required : true,
            },
            url : {
                type : String,
                required : true,
            },
        },
    },
    ],

    poster : {
        public_id : {
            type : String,
            required : true,
        },
        url : {
            type : String,
            required : true,
        },
    },

    views : {
        type : Number,
        default : 0,
    },

    numOfVideos : {
        type : Number,
        default : 0,
    },

    category : {
        type :String,
        required : true,
    },

    createdBy : {
        type : String,
        required : [true,"please enter creator name"],
    },

    createdAt : {
        type : Date,
        default : Date.now,

    },

});

export const Course = new mongoose.model("Course",schema);
