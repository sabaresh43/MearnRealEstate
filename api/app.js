
import express, { json, urlencoded } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/userRoutes.js'

dotenv.config()

mongoose.connect(process.env.MONGO).then(()=>{
  console.log('Connected to MongoDb');
}).catch((err)=>{
  console.log(err);
})

var app = express();

app.listen(3000,()=>{
  console.log('server is running on port 3000');
})

app.use("/api/user",userRouter)

export default app;
