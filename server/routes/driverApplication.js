
import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from 'url';
import DriverApplication from "../models/driverApplication.js";
import { Admin } from "../middleware.js";
import dotenv from 'dotenv';
dotenv.config();

const route = express.Router();

// Get current directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure storage for uploaded PDFs
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../pdfUpload'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `resume_${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});

// Multer config: only allow PDF up to 5MB
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed"), false);
    }
  }
});

// Create a new application with PDF stored locally
route.post("/application", upload.single("pdf"), async (req, res) => {
  try {
    let resumePath = null;

    if (req.file) {
      resumePath = `/pdfUpload/${req.file.filename}`;
    }

    const newApplication = new DriverApplication({
      ...req.body,
      resume: resumePath
    });

    await newApplication.save();
    
    res.status(201).json({
      message: "Application submitted successfully",
      resumePath
    });
  } catch (error) {
    console.error("Submission error:", error);
    res.status(500).json({
      message: error.message || "Server error"
    });
  }
});

// Get PDF file
route.get("/resume/:filename", async (req, res) => {
  try {
    const filePath = path.join(__dirname, '../pdfUpload', req.params.filename);
    
    res.sendFile(filePath, (err) => {
      if (err) {
        console.error("Error sending file:", err);
        res.status(404).json({ message: "File not found" });
      }
    });
  } catch (error) {
    console.error("Error fetching file:", error);
    res.status(500).json({ message: "Failed to fetch file" });
  }
});

// Admin: Get all applications
route.get("/application", Admin, async (req, res) => {
  try {
    const applications = await DriverApplication.find().sort({ createdAt: -1 });
    res.status(200).json(applications);
  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500).json({ message: "Failed to fetch applications" });
  }
});

// Admin: Get a specific application
route.get("/application/:id", Admin, async (req, res) => {
  try {
    const application = await DriverApplication.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.status(200).json(application);
  } catch (error) {
    console.error("Error fetching application:", error);
    res.status(500).json({ message: "Failed to fetch application" });
  }
});

// Admin: Update an application
route.put("/application/:id", Admin, async (req, res) => {
  try {
    const updatedApplication = await DriverApplication.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    if (!updatedApplication) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.status(200).json(updatedApplication);
  } catch (error) {
    console.error("Error updating application:", error);
    res.status(500).json({ message: "Failed to update application" });
  }
});

// Admin: Delete application and PDF file
route.delete("/application/:id", Admin, async (req, res) => {
  try {
    const application = await DriverApplication.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    if (application.resume) {
      try {
        const fs = await import('fs');
        const filePath = path.join(__dirname, '..', application.resume);
        fs.unlinkSync(filePath);
      } catch (fileError) {
        console.error("File deletion error:", fileError);
      }
    }

    await DriverApplication.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Application deleted successfully" });
  } catch (error) {
    console.error("Error deleting application:", error);
    res.status(500).json({ message: "Failed to delete application" });
  }
});

export default route;

















