const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/resume_db").then(()=>{
    console.log("connection is successful with DB");
}).catch((err)=>{
    console.log(err);
})
