import express ,{Application}from 'express'
//using .evn file 
import * as dotenv from "dotenv";
dotenv.config();

import './database/connection'
const app:Application =express()
const PORT:number= 3000

app.use('./src/storage', express.static('storage'));

app.use(express.json());
const cors = require("cors");
app.use(
  cors({
    origin: "*",
  })
);


import adminSeeder from './adminSeeder';
adminSeeder()
import userRoute from './routes/userRoute'
import workoutRoute from './routes/workoutRoute'
import userProfileRoute from'./routes/userProfileRoute'
app.use("",userRoute)
app.use("/admin",workoutRoute)
app.use("",userProfileRoute)



app.listen(PORT,()=>{
   
    console.log(`Server is running on port ${PORT}`)
    })

