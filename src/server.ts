import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './config';

process.on('uncaughtException', error => {
  // eslint-disable-next-line no-console
  // console.log('Uncaught exception is detected💀. Process is killed immediately')
  console.log(error);
  process.exit(1);
});

let server: Server;

async function dbconnect() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log('Database connected');

    server = app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (err) {
    console.log('failed to connect', err);
  }

  // gracefully shutdown server : unhandled promise rejection
  process.on('unhandledRejection', error => {
    // যদি সার্ভার এর মধ্যে কোন কাজ হতে থাকে তাহলে আগে সার্ভার
    // ক্লোজ করতে হবে তারপর error টা logger দিয়ে log ফাইল তৈরি করা তারপর process.exit(1) করা ।
    // eslint-disable-next-line no-console
    // console.log(
    //   'Unhandled rejection is detected 💀, we are closing our server...'
    // )
    if (server) {
      server.close(() => {
        console.log(error);
        process.exit(1);
      });
    } else {
      // যদি সার্ভার এ কোন কাজ না হতে থাকে তাহলে সরাসরি অফ করে দিবে ।
      process.exit(1);
    }
  });
}

dbconnect();

process.on('SIGTERM', () => {
  console.log('SIGTERM is received');
  if (server) {
    server.close();
  }
});
