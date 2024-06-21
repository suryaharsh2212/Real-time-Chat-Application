// import cookieParser from "cookie-parser"
// import "dotenv/config";
// import express, { Router, urlencoded } from "express" 
// import dotenv from "dotenv"
// import connecttoMongo from "./src/Database/MongodbConnection/connectToMongo.js"
// import { router } from "./src/Routes/routes.js"
// import { server } from "./src/socket.io/socketConnection.js"
// import { app } from "./src/socket.io/socketConnection.js"
// import cors from "cors"

// connecttoMongo()

// app.use(cors({ 
//     origin: 'https://real-time-chat-application-uyhn.vercel.app',
//     credentials: true,
//     withCredentials: true,
// }));
// app.use(cookieParser())
// app.use(express.urlencoded({extended:false}))
// app.use(express.json({limit:"20kb"}))
// app.use("/user",router)
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', 'https://real-time-chat-application-uyhn.vercel.app')
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization')
//     res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
//     res.setHeader('Access-Control-Allow-Credentials', 'true')
// })

// server.listen(process.env.PORT,()=>{
//     console.log(`Server is running on port ${process.env.PORT}`);
// })

import cookieParser from "cookie-parser";
import "dotenv/config";
import express from "express";
import connecttoMongo from "./src/Database/MongodbConnection/connectToMongo.js";
import { router } from "./src/Routes/routes.js";
import { server, app } from "./src/socket.io/socketConnection.js";
import cors from "cors";

const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connecttoMongo();

// Initialize Express app
const expressApp = express();

// Enable CORS with specific options
expressApp.use(cors({
    origin: 'https://real-time-chat-application-uyhn.vercel.app',
    credentials: true // <-- This allows credentials (cookies, authorization headers) to be sent to the server
}));

// Middleware
expressApp.use(cookieParser());
expressApp.use(express.urlencoded({ extended: false }));
expressApp.use(express.json({ limit: "20kb" }));

// Routes
expressApp.use("/user", router);

// Start the HTTP server
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});




