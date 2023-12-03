
import express, { json, urlencoded } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/userRoutes.js'
import authRouter from './routes/authRoutes.js'

dotenv.config()

mongoose.connect(process.env.MONGO).then(() => {
  console.log('Connected to MongoDb');
}).catch((err) => {
  console.log(err);
})

var app = express();

app.use(express.json());

app.listen(3000, () => {
  console.log('server is running on port 3000');
})

app.use("/api/user", userRouter)
app.use("/api/auth", authRouter);

app.use((err, req, res, next) => {
  const statuscode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statuscode).json({
    success: false,
    statuscode,
    message
  })
})

export default app;
