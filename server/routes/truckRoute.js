import Truck from "../models/Truck.js";
import express from "express"
import {Admin} from "../middleware.js";


const route = express.Router()

// create Truck

route.post("/create",Admin, async(req, res)=>{
    const truck = new Truck(req.body)
    try {
        const savedTruck = await truck.save()
        res.status(201).json(savedTruck)
    } catch (error) {
        console.log(error)
        res.status(401).json(error)
    }
})



// // Get all users

route.get("/trucks", async(req, res)=>{
    try {
        const trucks = await Truck.find()
        res.status(200).json(trucks)
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
})



// Get a truck

route.get("/:id", async(req, res)=>{
    try {
        const truck = await Truck.findById(req.params.id)
        res.status(200).json(truck)
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
})

// // Update a truck

route.put("/update/:id",Admin, async(req,res)=>{
    try {
       const updatedTruck = await Truck.findByIdAndUpdate(req.params.id,{$set:req.body})
       res.status(201).json(updatedTruck)
    } catch (error) {
        console.log(error)
        res.status(401).json(error)
    }
})

// // Delete a truck

route.delete("/:id", Admin,  async(req,res)=>{
    try {
        await Truck.findByIdAndDelete(req.params.id)
        res.status(202).json("User deleted successfully")
    } catch (error) {
        console.log(error)
        res.status(402).json(error)
    }
})

export default route