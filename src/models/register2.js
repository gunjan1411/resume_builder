const mongoose = require("mongoose");
const validator = require("validator");

const student_collection_schema = new mongoose.Schema({
    username:{
        type:String
    },
    surname:{
        type:String
    },
    password:{
        type:Number
    },
    confrim_password:{
        type:Number
    },
    email:{
        type:String
    },
    number:{
        type:String
    }
})

/* creating new Collection */
const student_collection2 = new mongoose.model("student_collection2",student_collection_schema);

module.exports = student_collection2;