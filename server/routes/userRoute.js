// import User from "../models/User.js";
// import express from "express"
// import jwt from "jsonwebtoken"
// import CryptoJS from "crypto-js"
// import {Admin} from "../middleware.js";


// const route = express.Router()


// // Get stats
// route.get("/stats", Admin, async (req, res)=>{
//     const date = new Date();
//     const prevyear = new Date(date.setFullYear(date.getFullYear() - 1));
//     console.log(date)
//     try{
//       const data = await User.aggregate([
//         {$match: {createdAt: {$gte: prevyear}}},
//         {
//           $project:{
//             month: { $month: "$createdAt"},
//           }
//         },
//         {
//           $group:
//           {_id: "$month",
//           total: {$sum: 1}}
//         }
//       ])
//       res.status(200).json(data)

//     }catch(err){
//       console.log(err)
//       res.status(500).json(err)
//     }
    
//   })

// // create user

// route.post("/register", async(req, res)=>{
//     const user = new User({
//         userName: req.body.userName,
//         email: req.body.email,
//         password: CryptoJS.AES.encrypt(req.body.password, process.env.crypto_key).toString(),
//         phone_no:req.body.phone_no,
//         address:req.body.address,
//         role:req.body.role
//     })
//     try {
//         const savedUser = await user.save()
//         res.status(201).json(savedUser)
//     } catch (error) {
//         console.log(error)
//         res.status(401).json(error)
//     }
// })

// // Login

// route.post("/login", async(req, res)=>{
//     try {
//         const user = await User.findOne({email : req.body.email})
//         if(!user){
//             res.status(401).json("user not found")
//         }
//         const password = CryptoJS.AES.decrypt(user.password, process.env.crypto_key).toString(CryptoJS.enc.Utf8);
//         if(password === req.body.password){
//             const accessToken = jwt.sign({
//                 id: user._id,
//                 role:user.role
//             }, process.env.jwt_key,
//         {expiresIn:"7D"})
//         res.status(201).json({user, accessToken})
//         }else{
//            res.status(401).json("password incorrect")
//         }
//     } catch (error) {
//         console.log(error)
//         res.status(401).json(error)
//     }
// })

// // Get all users

// route.get("/users", Admin, async(req, res)=>{
//     try {
//         const users = await User.find()
//         res.status(200).json(users)
//     } catch (error) {
//         console.log(error)
//         res.status(400).json(error)
//     }
// })

// // Get all drivers

// route.get("/drivers",Admin, async(req, res)=>{
//     try {
//         const users = await User.find({role:req.body.role})
//         res.status(200).json(users)
//     } catch (error) {
//         console.log(error)
//         res.status(400).json(error)
//     }
// })

// // Get a user

// route.get("/:id", Admin, async(req, res)=>{
//     try {
//         const user = await User.findById(req.params.id)
//         res.status(200).json(user)
//     } catch (error) {
//         console.log(error)
//         res.status(400).json(error)
//     }
// })

// // Update a user

// route.put("/update/:id", async(req,res)=>{
//     if(req.body.password){
//         req.body.password = CryptoJS.AES.decrypt(req.body.password, process.env.crypto_key).toString()
//     }
//     try {
//        const updatedUser = await User.findByIdAndUpdate(req.params.id,{$set:req.body})
//        res.status(201).json(updatedUser)
//     } catch (error) {
//         console.log(error)
//         res.status(401).json(error)
//     }
// })

// // Delete

// route.delete("/:id", Admin,  async(req,res)=>{
//     try {
//         await User.findByIdAndDelete(req.params.id)
//         res.status(202).json("User deleted successfully")
//     } catch (error) {
//         console.log(error)
//         res.status(402).json(error)
//     }
// })



// export default route




















import User from "../models/User.js";
import express from "express";
import jwt from "jsonwebtoken";
import CryptoJS from "crypto-js";
import { Admin } from "../middleware.js";

const route = express.Router();

// Improved login endpoint to match Redux thunk actions
route.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
                error: "User not found"
            });
        }

        // Decrypt and verify password
        const decryptedPassword = CryptoJS.AES.decrypt(
            user.password, 
            process.env.crypto_key
        ).toString(CryptoJS.enc.Utf8);

        if (decryptedPassword !== req.body.password) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
                error: "Incorrect password"
            });
        }

        // Create token payload
        const tokenPayload = {
            id: user._id,
            role: user.role,
            email: user.email
        };

        // Generate access token
        const accessToken = jwt.sign(
            tokenPayload,
            process.env.jwt_key,
            { expiresIn: "7d" }
        );

        // Prepare user data to return (excluding sensitive info)
        const userData = {
            _id: user._id,
            userName: user.userName,
            email: user.email,
            phone_no: user.phone_no,
            address: user.address,
            role: user.role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        };

        res.status(200).json({
            success: true,
            user: userData,
            token: accessToken,
            message: "Login successful"
        });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({
            success: false,
            message: "Login failed",
            error: error.message
        });
    }
});

// Enhanced registration endpoint
route.post("/register", async (req, res) => {
    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
                error: "Email already registered"
            });
        }

        // Encrypt password
        const encryptedPassword = CryptoJS.AES.encrypt(
            req.body.password,
            process.env.crypto_key
        ).toString();

        const user = new User({
            userName: req.body.userName,
            email: req.body.email,
            password: encryptedPassword,
            phone_no: req.body.phone_no,
            address: req.body.address,
            role: req.body.role || "user" // Default role
        });

        const savedUser = await user.save();
        
        // Generate token for immediate login after registration
        const tokenPayload = {
            id: savedUser._id,
            role: savedUser.role,
            email: savedUser.email
        };

        const accessToken = jwt.sign(
            tokenPayload,
            process.env.jwt_key,
            { expiresIn: "7d" }
        );

        // Prepare response data
        const userData = {
            _id: savedUser._id,
            userName: savedUser.userName,
            email: savedUser.email,
            phone_no: savedUser.phone_no,
            address: savedUser.address,
            role: savedUser.role,
            createdAt: savedUser.createdAt,
            updatedAt: savedUser.updatedAt
        };

        res.status(201).json({
            success: true,
            user: userData,
            token: accessToken,
            message: "Registration successful"
        });

    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({
            success: false,
            message: "Registration failed",
            error: error.message
        });
    }
});

// Get stats
// route.get("/stats", Admin, async (req, res) => {
//     const date = new Date();
//     const prevyear = new Date(date.setFullYear(date.getFullYear() - 1));
    
//     try {
//         const data = await User.aggregate([
//             { $match: { createdAt: { $gte: prevyear } } },
//             {
//                 $project: {
//                     month: { $month: "$createdAt" },
//                 }
//             },
//             {
//                 $group: {
//                     _id: "$month",
//                     total: { $sum: 1 }
//                 }
//             }
//         ]);
//         res.status(200).json({
//             success: true,
//             data: data
//         });
//     } catch (err) {
//         console.error("Stats error:", err);
//         res.status(500).json({
//             success: false,
//             message: "Failed to get stats",
//             error: err.message
//         });
//     }
// });


// New Stats
// Get stats - Modified to match frontend expectations
route.get("/stats", Admin, async (req, res) => {
    const date = new Date();
    const prevyear = new Date(date.setFullYear(date.getFullYear() - 1));
    
    try {
      const data = await User.aggregate([
        { $match: { createdAt: { $gte: prevyear } } },
        {
          $project: {
            month: { $month: "$createdAt" },
            }
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: 1 }
          }
        },
        { $sort: { _id: 1 } } // Ensure months are in order
      ]);
  
      // Transform data to match frontend expectations
      const transformedData = data.map(item => ({
        _id: item._id,
        total: item.total
      }));
        
    res.status(200).json(transformedData); // Send direct array response

} catch (err) {
  console.error("Stats error:", err);
  res.status(500).json({
    error: "Failed to get stats",
    details: err.message
  });
}
});

// End New State

// Get all users
route.get("/users", Admin, async (req, res) => {
    try {
        const users = await User.find().select('-password').sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: users.length,
            users: users
        });
    } catch (error) {
        console.error("Get users error:", error);
        res.status(400).json({
            success: false,
            message: "Failed to get users",
            error: error.message
        });
    }
});

// Get all drivers
route.get("/drivers", Admin, async (req, res) => {
    try {
        const drivers = await User.find({ role: "driver" }).select('-password');
        res.status(200).json({
            success: true,
            count: drivers.length,
            drivers: drivers
        });
    } catch (error) {
        console.error("Get drivers error:", error);
        res.status(400).json({
            success: false,
            message: "Failed to get drivers",
            error: error.message
        });
    }
});

// Get a user
route.get("/:id", Admin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        res.status(200).json({
            success: true,
            user: user
        });
    } catch (error) {
        console.error("Get user error:", error);
        res.status(400).json({
            success: false,
            message: "Failed to get user",
            error: error.message
        });
    }
});

// Update a user
route.put("/update/:id", async (req, res) => {
    try {
        if (req.body.password) {
            req.body.password = CryptoJS.AES.encrypt(
                req.body.password,
                process.env.crypto_key
            ).toString();
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        ).select('-password');

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            user: updatedUser,
            message: "User updated successfully"
        });
    } catch (error) {
        console.error("Update user error:", error);
        res.status(400).json({
            success: false,
            message: "Failed to update user",
            error: error.message
        });
    }
});

// Delete user
route.delete("/:id", Admin, async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "User deleted successfully"
        });
    } catch (error) {
        console.error("Delete user error:", error);
        res.status(400).json({
            success: false,
            message: "Failed to delete user",
            error: error.message
        });
    }
});

export default route;
