const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userschema = new Schema({

    firstname:{
        type:String,
        require :true
    },
    lastname:{
        type:String,
        require:true
    },
    gender:{
        type:String,
        require:true
    },
    phone_no:{
        type:Number,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    }
});

module.exports =  newuser = mongoose.model("oyebusy",userschema);