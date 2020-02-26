import express from 'express';
import mongoose from 'mongoose';
import setupAdmin from './admin/admin.module';

const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

const run = async () => {
  await mongoose.connect('mongodb://localhost:27017/workshop2', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await setupAdmin(app);

  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
};

run();
