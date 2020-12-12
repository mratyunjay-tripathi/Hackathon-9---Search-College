const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 8080

// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const { connection } = require('./connector');


app.get("/findcolleges", async (req,res)=>{
let {name,state,city,
    minPackage,maxFees,course,exams}=req.query;

    console.log(req.query,name,state);

    
    if(name==undefined){
        name="";
    }
    if(state==undefined){
        state="";
    }
    
    if(city==undefined){
        city="";
    }
    if(course==undefined){
        course="";
    }
    if(exams==undefined){
        exams="";
    }
    

    if(Number(minPackage)<=0 
        || minPackage==undefined){
        minPackage=0;
    }else{
        minPackage=Number(minPackage);
    }

    if(Number(maxFees)<=0 
        || maxFees==undefined){
        maxFees=Number.MAX_VALUE;
    }else{
        maxFees=Number(maxFees);
    }


    console.log(connection,name,state,city,
        minPackage,maxFees,exams,course);

    const records=await connection.find({
    name:{$regex:name,$options:"$i"},
    city:{$regex:city,$options:"$i"},
    state:{$regex:state,$options:"$i"},
    exam:{$regex:exams,$options:"$i"},
    course:{$regex:course,$options:"$i"},
    maxFees:{$lte:maxFees},
    minPackage:{$gte:minPackage}});

    res.send(records);

});


// {"_id":{"$oid":"5fd4b0bc87568413ec42c912"},"exam":["JEE ADVANCE"],"name":"Indian Institute of Technology","city":"Varanashi","state":"Uttar Pradesh","course":"B.Tech","maxFees":7.15,"minPackage":35.5,"__v":0}

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;