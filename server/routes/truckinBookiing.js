import TruckBooking from "../models/truckBooking.js";
import express from "express"
import {Admin, client }from "../middleware.js";


const route = express.Router()

// create Truck

route.post("/create",client, async(req, res)=>{
    console.log("Middleware user:", req.user); 
    const truckBooking = new TruckBooking(
        {...req.body, clientID:req.user.id}
    )
    try {
        const savedTruckBooking = await truckBooking.save()
        res.status(201).json(savedTruckBooking)
    } catch (error) {
        console.log(error)
        res.status(401).json(error)
    }
})



// // Get all bookings

route.get("/truckbookings", Admin, async(req, res)=>{
    try {
        const truckbookings = await TruckBooking.find()
        res.status(200).json(truckbookings)
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
})

route.get("/truckbooking/:id", Admin, async(req, res) => {
    try {
        const truckbooking = await TruckBooking.findById(req.params.id);
        if (!truckbooking) {
            return res.status(404).json({ message: "Truck booking not found" });
        }
        res.status(200).json(truckbooking);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Invalid ID format", error });
    }
});


// // Update a truck

route.put("/update/:id",Admin, async(req,res)=>{
    try {
       const updatedTruckBooking = await TruckBooking.findByIdAndUpdate(req.params.id,{$set:req.body})
       res.status(201).json(updatedTruckBooking)
    } catch (error) {
        console.log(error)
        res.status(401).json(error)
    }
})

// // Delete a truck

route.delete("/:id", Admin,  async(req,res)=>{
    try {
        await TruckBooking.findByIdAndDelete(req.params.id)
        res.status(202).json("User deleted successfully")
    } catch (error) {
        console.log(error)
        res.status(402).json(error)
    }
})



export default route