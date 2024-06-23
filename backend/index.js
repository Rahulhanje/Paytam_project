const express = require("express");
const cors=require("cors");//this is needed because of our Backend and frountend both are running on different ports


const app=express();
app.use(cors());
app.use(express.json());                           

const mainRouter=require("./routers/index");


app.use("/api/v1",mainRouter);



app.listen(3000);