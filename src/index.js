const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 8080

// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const { connection } = require('./connector');


app.get("/findColleges", async (req,res)=>{
let {name,state,city,
    minPackage,maxFees,course,exams}=req.query;

    console.log(req.query,name,state);

    if(minPackage<=0){
        minPackage=0;
    }
    if(maxFees<=0){
        maxFees=Number.MAX_VALUE;
    }
    console.log(connection);

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