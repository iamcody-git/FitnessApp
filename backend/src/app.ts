import express, { Application } from 'express';
import * as dotenv from 'dotenv';
dotenv.config();
import './database/connection'; // Ensure this connects to the DB
import sequelize from './database/connection'; // Import the sequelize instance

const app: Application = express();
const PORT: number = 3000;

app.use('/src/storage', express.static('storage'));
app.use(express.json());

const cors = require('cors');
app.use(
  cors({
    origin: '*',
  })
);

import userRoute from './routes/userRoute';
import workoutRoute from './routes/workoutRoute';
import userProfileRoute from './routes/userProfileRoute';
import packageController from './controller/packageController';
import adminSeeder from './adminSeeder';
import packageRoute from './routes/packageRoute'
// import kMeansRoute from './routes/kMeansRoute'


// Function to initialize database and start the server
const startServer = async () => {
  try {
    await adminSeeder();
    await packageController.seedPackage();

    // Set up routes
    app.use('', userRoute);
    app.use('/admin', workoutRoute);
    app.use('', userProfileRoute);
    app.use("/admin",packageRoute)
    // app.use('', kMeansRoute);

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
  }
};

startServer();
