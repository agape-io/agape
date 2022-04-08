import mongoose from 'mongoose';

import { env } from './env';

import { DB_STATE } from './constants';

const { MongoDB } = env;

export default async function connect() {
  if (!(mongoose.connection.readyState === DB_STATE.CONNECTED)) {
    return mongoose
      .connect(`${MongoDB.ConnString}`)
      .then(() => {
        console.log('MongoDB is connected');
      })
      .catch((err: any) => {
        console.error(`MongoDB connection unsuccessful: ${err}`);
      });
  }
  return Promise.resolve();
}
