import Message from "../models/messages.js";
import express from "express"
import {Admin,driver} from "../middleware.js";


const route = express.Router()

// create message

route.post("/create", driver, async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: "User ID not found in token" });
        }

        const message = new Message({
            ...req.body,
            driverID: req.user.id, // Auto-assign logged-in user's ID
        });

        const savedMessage = await message.save();
        res.status(201).json(savedMessage);
    } catch (error) {
        console.log(error);
        res.status(401).json(error);
    }
});




// // Get all messages

// Get all messages
route.get("/messages", Admin, async (req, res) => {
    try {
        const messages = await Message.find().populate("driverID", "userName"); // Populate driverID with userName
        res.status(200).json(messages);
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});




// Get a message

route.get("/:id", Admin, async(req, res)=>{
    try {
        const message = await Message.findById(req.params.id)
        res.status(200).json(message)
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
})

// // Update a messages

route.put("/update/:id",Admin, async(req,res)=>{
    try {
       const updatedmessage = await Message.findByIdAndUpdate(req.params.id,{$set:req.body})
       res.status(201).json(updatedmessage)
    } catch (error) {
        console.log(error)
        res.status(401).json(error)
    }
})

// // Delete a message

route.delete("/:id", Admin,  async(req,res)=>{
    try {
        await Message.findByIdAndDelete(req.params.id)
        res.status(202).json("User deleted successfully")
    } catch (error) {
        console.log(error)
        res.status(402).json(error)
    }
})

export default route