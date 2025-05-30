// import mongoose from "mongoose";

// const driverApplicationSchema = new mongoose.Schema({
//     fullName: { type: String, required: true },
//     email: { type: String, required: true },
//     phone: { type: String, required: true },
//     licenseNumber: { type: String, required: true },
//     experience: { type: Number, required: true },
//     truckType: { type: String, required: true },
//     address: { type: String, required: true },
//     city: { type: String, required: true },
//     state: { type: String, required: true },
//     zipCode: { type: String, required: true },
//     resume: { type: String, required: true,  createdAt: {
//       type: Date,
//       default: Date.now
//     }},

//  // Store the file path or URL
// });

// export default mongoose.model('DriverApplication', driverApplicationSchema);
















import mongoose from "mongoose";

const driverApplicationSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    licenseNumber: { type: String, required: true },
    experience: { type: Number, required: true },
    truckType: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    resume: { type: String, required: true },
    createdAt: {
      type: Date,
      default: Date.now
    }
});

export default mongoose.model('DriverApplication', driverApplicationSchema);
























// import mongoose from "mongoose";

// const driverApplicationSchema = new mongoose.Schema({
//   fullName: {
//     type: String,
//     required: true
//   },
//   email: {
//     type: String,
//     required: true
//   },
//   phone: {
//     type: String,
//     required: true
//   },
//   licenseNumber: {
//     type: String,
//     required: true
//   },
//   experience: {
//     type: Number,
//     required: true
//   },
//   truckType: {
//     type: String,
//     required: true
//   },
//   address: {
//     type: String,
//     required: true
//   },
//   city: {
//     type: String,
//     required: true
//   },
//   state: {
//     type: String,
//     required: true
//   },
//   zipCode: {
//     type: String,
//     required: true
//   },
//   resumeUrl: String,        // Changed from 'resume' to match PDF URL pattern
//   resumePublicId: String,   // Added for Cloudinary public ID
//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// const DriverApplication = mongoose.model("DriverApplication", driverApplicationSchema);
// export default DriverApplication;


