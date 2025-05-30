import mongoose from "mongoose";


const TruckBookingSchema = new mongoose.Schema({
    pickupLocation: { type: String, required: true },
    dropoffLocation: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    truckType: { type: String, required: true },
    loadWeight: { type: Number, required: true },
    loadType: { type: String, required: true },
    specialInstructions: { type: String },
    paymentMethod: { type: String, required: true },
    clientID:{type:mongoose.Schema.Types.ObjectId, ref:"User"}
},
{
    timestamps:true
})

TruckBookingSchema.index({clientID:1})
export default mongoose.model("TruckBooking", TruckBookingSchema)