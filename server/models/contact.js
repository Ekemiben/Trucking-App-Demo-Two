import mongoose from "mongoose";


const ContactSchema = new mongoose.Schema({
    name: {
        type: String,  required: true
    },
    email: {
        type: String, required: true
    },
    
    phone_no: {
        type: String, required: true
    },
    message: { type: String },
    createdAt: {
        type: Date,
        default: Date.now
      }
   
},
{
    timestamps:true
})

export default mongoose.model("Contact", ContactSchema)





