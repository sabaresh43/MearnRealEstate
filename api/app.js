
import express, { json, urlencoded } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

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

export default app;
