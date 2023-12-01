
import express, { json, urlencoded } from 'express';




var app = express();

app.listen(3000,()=>{
  console.log('server is running on port 3000');
})

export default app;
