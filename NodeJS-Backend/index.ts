import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import dotenv from 'dotenv';
import userRoute from './src/routes/user.route'

dotenv.config();

mongoose.connect(`${process.env.MONGO_URL}`,{},err=>{
  if(!err){
    console.log('Database connection successed!');
  }else{
    console.log('Database connection failed!' + err);
  }
})

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cors());
app.use(express.static(path.join(__dirname,'public')));
app.use('/',express.static(path.join(__dirname,'public')));
app.use('/api/users',userRoute);

const port = process.env.PORT;
app.listen(port,()=>{
  console.log(`Listening on port ${port}`);
})


