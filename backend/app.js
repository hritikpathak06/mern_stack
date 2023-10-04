const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const path = require("path");





app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,"../frontend/build")))

// console.log(express.static(path.join(__dirname,"../frontend/build")))

// API CALLING
const productRoute = require("./route/productRoutes");
const userRoute = require("./route/userRoutes");
const orderRoute = require("./route/orderRoutes");


app.use("/api/v1",productRoute)
app.use("/api/v1",userRoute);
app.use("/api/v1",orderRoute);

app.use('*', function(req,res){
    res.sendFile(__dirname,"build",'index.html')
})




module.exports = app;