import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Route imports
import userRoute from "./routes/userRoute.js";
import truckRoute from "./routes/truckRoute.js";
import messagesRoute from "./routes/messagesRoute.js";
import booking from './routes/truckinBookiing.js';
import contact from "./routes/contactRoute.js";
import driverApplication from "./routes/driverApplication.js";

// Initialize environment variables
dotenv.config();

// Get current directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect to MongoDB database
mongoose.connect(process.env.Mongo_URL)
  .then(() => {
    console.log("Server is successfully connected to database");
  })
  .catch((error) => {
    console.error("Database connection error:", error);
    process.exit(1);
  });

// Initialize Express app
const app = express();

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(cors());

// Serve static files from the pdfUpload directory
app.use('/pdfUpload', express.static(path.join(__dirname, 'pdfUpload')));

// Basic route for health check
app.get('/', (req, res) => {
  res.send('Backend is up and running!');
});

// API Routes
app.use("/api/user", userRoute);
app.use("/api/truck", truckRoute);
app.use("/api/truckbooking", booking);
app.use("/api/message", messagesRoute);
app.use("/api", contact);
app.use("/api", driverApplication);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


