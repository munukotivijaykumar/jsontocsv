const express = require("express")
const bodyparser =require("body-parser")
const mongoose =require("mongoose");
const ejs =require("ejs");
const app = express(); 
const key = require("./setup/connect").sceret;
const cookieparser = require("cookie-parser");
const fs = require('fs');
const newuser = require("./models/newuser");
const port = process.env.PORT ||5000;
const {Parser} =require('json2csv')  
app.use(bodyparser.urlencoded({extended : false}))
app.use(bodyparser.json());
app.use(express.static("public"));
app.set("view engine","ejs");


//mongodb connection 
const db =require("./setup/connect").mongodbURL;
const s =async()=>{ 
await mongoose
.connect(db,{ useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true, useUnifiedTopology: true })
.then(()=>console.log("mongodb connceted"))
.catch(err =>console.log(err))
}
s().catch(err => console.log(err))
// @type    GET
//@route    /
// @desc    starting router
// @access  PUBLIC
app.use(cookieparser());

app.get("/",(req,res)=>{
//res.send("welcome");
res.render("home",{
    download:false
});
});

app.post("/auth",(req,res)=>{

    const data = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        gender: req.body.gender,
        phone_no:req.body.phone_no,
        email:req.body.email,
       password: req.body.password,
       
    }

    
    const Newuser =new newuser(data);
    Newuser
    .save()
    .then( res.render("home",{
        download:true,
        data:data
    }) )
    .catch(err => console.log(err));
   
})

app.get("/download",async(req,res)=>{

    newuser.find({})
    .then(users =>{
       
        const data = users.map(row =>({
            firstname:row.firstname,
            lastname:row.lastname,
            gender:row.gender,
            phone_no:row.phone_no,
            email:row.email,
            password:row.password

        }))
        
        console.log(data[0])
        
        const headers = Object.keys(data[0]);
        console.log(headers)
          const json2parser = new Parser({headers});
        const csv = json2parser.parse(data);
        
        fs.writeFile('sample.csv',csv,(err)=>{
            if (err) throw err;
             console.log(csv);
              res.download("sample.csv");
                
        })

    })
    .catch(err =>console.log(err))
})
app.listen(port,console.log("server is running.........."));

module.exports=app;

