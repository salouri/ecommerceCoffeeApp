const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Handler of uncaught exception is supposed to be at the top before the entire app.
//crashing the app after an uncaught exception is a must; to get out of the unclean-state
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION !! Shutting down...');
  console.log(err.name, err.message);
  process.exit(1); // crash the app
  //Note: another 3rd party tool, on the host, should be set to restart the app once it crashes
});

dotenv.config({ path: './config.env' }); //accessed from process.env.

const app = require('./app'); // app.js = express, routes, middlewares

const password = process.env.DATABASE_PASSWORD;
const database = process.env.DATABASE.replace('<PASSWORD>', password)
  .replace('<DB_USER>', process.env.DB_USER)
  .replace('<DB_NAME>', process.env.DB_NAME);

const connectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true, //use the new "Server Discover and Monitoring" engine
  ssl: true,
  sslValidate: true,
};

mongoose
  .connect(database, connectOptions)
  .then(() => {
    console.log('Database Cloud-Connection Successful');
  })
  .catch((err) => {
    console.log('Database connection failed!');
    console.log(err);
  });

// Start the server
const port = process.env.PORT || 3001;
const server = app.listen(port, () => {
  console.log(
    `App is running on port ${port}, "${process.env.NODE_ENV.toUpperCase()}" environment`
  );
});

// listen on "unhandledRejection" event
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLER REJECTION * Shutting down...');
  console.log(err.name, err.message);
  // close the app gracefully
  server.close(() => {
    process.exit(1); // crash the app
    //Note: another 3rd party tool, on the host, should be set to restart the app once it crashes
  });
});

process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down the app gracefully...');
  server.close(() => {
    console.log('Process Terminated!');
  });
});
