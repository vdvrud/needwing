import express from 'express';
import { json, urlencoded } from 'body-parser';

const app = express();
app.use(json({ limit: '50mb' }));
app.use(urlencoded({ limit: '50mb', extended: false }));




app.get('/api/stores/test', (req, res) => {
  res.send('Server is working on needwing.com for store service')
});

app.all('*', async (req, res) => {
  // console.log(req, 'check this outs')
  throw new Error('Not found !')
});
export { app };
