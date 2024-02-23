const express = require("express");
const app = express();
const port = 3030;
require("./db/conn");
const hbs = require("hbs");
const path = require("path");
const resister = require("./models/register2");
const index_db = require("../src/models/index_db");
const { pipeline } = require("stream");
/* const student_collection2 = require("./models/register2"); */
// const student_collection = require("./models/resister");
// require("../templates/views/login.hbs")
// var cookieParser = require('cookie-parser');
var session = require('express-session');


app.use(express.json());
app.use(express.urlencoded({ extended: false }))

// app.use(cookieParser());
app.use(session({secret: "this is secret"}));

const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");
const login_path = path.join(__dirname, "../templates/views/login");
const index_path = path.join(__dirname, "../templates/views/index");
console.log(template_path);
console.log(login_path);
console.log(index_path);

app.set("view engine", "hbs");
app.set("views", template_path); // for only take a view folders file in this app.js , it will not show thw index.hbs
hbs.registerPartials(partials_path);
hbs.registerPartials(login_path);
hbs.registerPartials(index_path);

/*app.use(express.static(static_path));*/

app.get("/", (req, res) => {
    res.render("index");
})

app.get("/login", (req, res) => {
    console.log("get")
    res.render("login")
})

app.get("/index", (req, res) => {
    console.log("get index");
    res.render("index")
})

app.post("/index", async (req, res) => {
    try {

        const first_name = req.body.first_name;
        const lastname = req.body.lastname;
        const position = req.body.position;
        const email = req.body.email;
        const number = req.body.number;
        const address = req.body.address;

        const Domain = req.body.Domain;
        const Collage = req.body.Collage;
        const Skills = req.body.Skills;
        const Project_Name1 = req.body.Project_Name1;
        const Detailes1 = req.body.Detailes1;
        const Project_Name2 = req.body.Project_Name2;
        const Detailes2 = req.body.Detailes2;

        console.log(first_name, "and", lastname);

        //-----------------------
        const unamevarification = new index_db({
            first_name: req.body.first_name,
            lastname: req.body.lastname,
            position: req.body.position,
            email: req.body.email,
            number: req.body.number,
            address: req.body.address,
            Domain: req.body.Domain,
            Collage: req.body.Collage,
            Skills: req.body.Skills,
            Project_Name1: req.body.Project_Name1,
            Detailes1: req.body.Detailes1,
            Project_Name2: req.body.Project_Name2,
            Detailes2: req.body.Detailes2

        })
        console.log(unamevarification, "unamevarification")
        const response = await unamevarification.save();
        console.log(response)
        req.session.resumeData = response;
        //===========
        
        // res.send(response)
        res.redirect("/resume");




    } catch (err) {
        res.status(400).send("this Email is not found in our server try to write correct Email  Resister your self ");
        console.log(err);
    }
})

app.get("/resisters", (req, res) => {
    res.render("resisters");
})

app.get("/forgot_password", (req, res) => {
    res.render("forgot_password")
})

app.get("/sending", (req, res) => {
    res.render("sending")
})

app.post("/login", async (req, res) => {
    try {

        const email = req.body.email;
        const password = req.body.password;

        console.log(email, "and", password);

        const useremail = await resister.findOne({ email: email });
        /*  res.send(useremail);*/
        /* console.log(useremail.password); 
        console.log(password); */
        if (useremail.password == password) {
            // res.status(201).render("index");
            res.status(201);
            res.redirect("/index")
        }
        else {
            res.status(400).send("Opps!! Password Is Not Maching Try Again")
        }

    } catch (err) {
        console.log("error : ", err);
        res.status(400).send("this Email is not found in our server try to write correct Email or Resister your self ")
    }
})

app.post("/resisters", async (req, res) => {
    try {
        console.log(req.body.username);
        console.log(req.body.surname);
        console.log(req.body.password);
        console.log(req.body.confrim_password);
        const unamevarification = new resister({
            username: req.body.username,
            surname: req.body.surname,
            password: req.body.password,
            confrim_password: req.body.confrim_password,
            email: req.body.email,
            number: req.body.number
        })
        console.log(unamevarification, "unamevarification")
        const response = await unamevarification.save();

        

    } catch (err) {
        console.log(err);
    }
})



app.get("/resume", (req, res) => {
    
    // console.log("Recieved Data on resume" + req.session.resumeData.first_name)
    res.render("resume", req.session.resumeData);
});

app.listen(port, () => {
    console.log("server is live on", port);
});