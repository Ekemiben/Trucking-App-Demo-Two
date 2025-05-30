import mongoose from "mongoose";


const MessageSchema = new mongoose.Schema({
    subject: {type:String, required:true},
    body:{type:String, required:true},
    driverID:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
    image:{type:String}
},
{
    timestamps:true
})

export default mongoose.model("Message", MessageSchema)