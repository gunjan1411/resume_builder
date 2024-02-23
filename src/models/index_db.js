const mongoose = require("mongoose");
const validator = require("validator");

const user_data_info = new mongoose.Schema({
    first_name:{
        type: String
    },
    lastname:{
        type:String,
    },
    position:{
        type:String,
    },
    email:{
        type:String,
    },
    number:{
        type:String,
    },
    address:{
        type:String
    },
    Domain:{
        type:String
    },
    Collage:{
        type:String
    },
    Skills:{
        type:String
    },
    Project_Name1:{
        type:String
    },
    Detailes1:{
        type:String
    },
    Project_Name2:{
        type:String
    },
    Detailes2:{
        type:String
    },
    

}
)

/* creating new Collection */
const user_collection = new mongoose.model("user_collection",user_data_info);

module.exports = user_collection;