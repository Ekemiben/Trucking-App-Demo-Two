import Contact from "../models/contact.js";
import express from "express"
const route = express.Router()
import { Admin } from "../middleware.js"




route.post("/contact", async(req, res)=>{
    const contact = new Contact({
        name: req.body.name,
        email: req.body.email,
        phone_no:req.body.phone_no,
        message:req.body.message
        
    })
    try {
        const savedContact = await contact.save()
        res.status(201).json(savedContact)
    } catch (error) {
        console.log(error)
        res.status(401).json(error)
    }
    
})

route.get("/contact", Admin, async (req, res) => {
    try {
        const contactForm = await Contact.find().sort({ createdAt: -1 });
        res.status(200).json(contactForm);
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});
route.get("/contact/:id", Admin, async(req, res)=>{
    try {
        const message = await Contact.findById(req.params.id)
        res.status(200).json(message)
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
})

route.delete("/contact/:id", Admin, async (req, res) => {
    try {
        await Contact.findByIdAndDelete(req.params.id);
        res.status(202).json("Message deleted successfully");
    } catch (error) {
        console.log(error);
        res.status(402).json(error);
    }
});

export default route





















// import Contact from "../models/contact.js";
// import express from "express";
// const route = express.Router();
// import { Admin } from "../middleware.js";

// const multer = require('multer');
// const cloudinary = require('../Cloudinary.js');

// // Configure multer for file upload
// const storage = multer.memoryStorage();
// const upload = multer({ 
//   storage: storage,
//   limits: {
//     fileSize: 5 * 1024 * 1024, // 5MB limit
//     files: 1
//   },
//   fileFilter: (req, file, cb) => {
//     if (file.mimetype === 'application/pdf') {
//       cb(null, true);
//     } else {
//       cb(new Error('Only PDF files are allowed'), false);
//     }
//   }
// });

// // Create contact with optional PDF attachment
// route.post("/contact", upload.single('pdf'), async (req, res) => {
//   try {
//     let pdfUrl = null;
//     let pdfPublicId = null;

//     // If PDF file was uploaded
//     if (req.file) {
//       // Upload to Cloudinary
//       const uploadResult = await new Promise((resolve, reject) => {
//         const stream = cloudinary.uploader.upload_stream(
//           {
//             resource_type: 'raw',
//             format: 'pdf',
//             folder: 'contact_pdfs'
//           },
//           (error, result) => {
//             if (error) reject(error);
//             resolve(result);
//           }
//         );

//         stream.end(req.file.buffer);
//       });

//       pdfUrl = uploadResult.secure_url;
//       pdfPublicId = uploadResult.public_id;
//     }

//     // Create contact in database
//     const contact = new Contact({
//       name: req.body.name,
//       email: req.body.email,
//       phone_no: req.body.phone_no,
//       message: req.body.message,
//       pdfUrl: pdfUrl,
//       pdfPublicId: pdfPublicId
//     });

//     const savedContact = await contact.save();
//     res.status(201).json(savedContact);
//   } catch (error) {
//     console.error("Error creating contact:", error);
//     res.status(400).json({
//       message: error.message || "Failed to create contact",
//       error: process.env.NODE_ENV === 'development' ? error : undefined
//     });
//   }
// });

// // Get all contacts (admin only)
// route.get("/contact", Admin, async (req, res) => {
//   try {
//     const contacts = await Contact.find().sort({ createdAt: -1 });
//     res.status(200).json(contacts);
//   } catch (error) {
//     console.error("Error fetching contacts:", error);
//     res.status(500).json({ message: "Failed to fetch contacts" });
//   }
// });

// // Get single contact (admin only)
// route.get("/contact/:id", Admin, async (req, res) => {
//   try {
//     const contact = await Contact.findById(req.params.id);
//     if (!contact) {
//       return res.status(404).json({ message: "Contact not found" });
//     }
//     res.status(200).json(contact);
//   } catch (error) {
//     console.error("Error fetching contact:", error);
//     res.status(500).json({ message: "Failed to fetch contact" });
//   }
// });

// // Delete contact (admin only) - also deletes PDF from Cloudinary if exists
// route.delete("/contact/:id", Admin, async (req, res) => {
//   try {
//     const contact = await Contact.findById(req.params.id);
//     if (!contact) {
//       return res.status(404).json({ message: "Contact not found" });
//     }

//     // Delete PDF from Cloudinary if exists
//     if (contact.pdfPublicId) {
//       await cloudinary.uploader.destroy(contact.pdfPublicId, {
//         resource_type: 'raw'
//       });
//     }

//     // Delete contact from database
//     await Contact.findByIdAndDelete(req.params.id);
    
//     res.status(200).json({ message: "Contact deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting contact:", error);
//     res.status(500).json({ message: "Failed to delete contact" });
//   }
// });

// export default route;

