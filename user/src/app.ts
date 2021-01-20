import express from 'express';
import { json, urlencoded } from 'body-parser';
import { userRouter } from "./routes/user/user";

const app = express();
// app.set('trust proxy', true);
app.use(json({ limit: '50mb' }));
app.use(urlencoded({ limit: '50mb', extended: false }));




app.use('/api/users', userRouter);
app.get('/users/test', (req, res) => {
  res.send('Server is working on needwing.com')
});

app.get('/', (req, res) => {
  res.send('working')
});

// app.all('*', async (req, res) => {
//   // console.log(req, 'check this outs')
//   throw new Error('Not found !')
// });
export { app };
