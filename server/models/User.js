import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    userName: {type:String, unique:true, required:true},
    email:  {type:String, unique:true, required:true},
    password: {type:String, required:true},
    phone_no : {type:String},
    address : {type:String},
    image:{type:String},
    role:{type:String, enum: ["admin", "driver", "client"], 
        default:"client",
        require:true}
},
{
    timestamps:true
})

export default mongoose.model("User", UserSchema)