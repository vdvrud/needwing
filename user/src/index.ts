import express from 'express';
import { userRouter } from './routes/user/user';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/user', userRouter);


const start = async () => {
    try {
     
  
      await mongoose.connect('mongodb+srv://wings:wings@cluster0.uve59.mongodb.net/users?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      });
      console.log('Connected to MongoDb !!');
      const PORT = 5000 || process.env.PORT;
  
      app.listen(PORT, () => {
          console.log(`User service started on ${PORT}`)
      });
    } catch (err) {
      console.error(err);
    }
  };
  
  start();
  

