import mongoose from "mongoose";


const TruckSchema = new mongoose.Schema({
    truckNo:{type:String, required:true, unique:true },
    driver:{type:String, required:true},
    maxLoadWeight:{type:Number},
    image:{type:String},
    status:{type:String, required:true}
},
{
    timestamps:true
})


export default mongoose.model("Truck", TruckSchema)