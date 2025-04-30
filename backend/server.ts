import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';
import express from 'express';
import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import employeeRoute from './routes/employeeroute.ts';
import loginRoute from './routes/loginroute.ts';

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware
app.use('/', employeeRoute);
app.use('/', loginRoute);

app.use((req: Request, res: Response) => {
  res.status(404).send('Not Found');
});

/**
 * Global error handler
 */
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  res.status(500).send({ error: err.message });
});

// connect DB

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error('MONGO_URI is not defined');
}

mongoose
  .connect(MONGO_URI, {
    // options for the connect method to parse the URI
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // sets the name of the DB that our collections are part of
    dbName: 'Cat-Snake',
  })
  .then(() => console.log('👌👌 MongoDB connected'))
  .catch((err) => console.log('👎🏻👎🏻 MongoDB connection error:', err.message));

// Listener
const PORT = parseInt(process.env.PORT || '3000', 10);
app.listen(PORT, '0.0.0.0', () =>
  console.log(`🎁🎁🎁 Server running on port ${PORT}`)
);

export default app;
