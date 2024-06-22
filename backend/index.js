const express = require("express");
const mainRouter=require("./routers/index");

const app=express();

app.user("/api/v1",mainRouter);



app.listen(3000);