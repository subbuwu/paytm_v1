import express from "express"
import dotenv from 'dotenv';
import cors from "cors"
import { initDB } from "./db/initDB.js"
import rootRouter from "./routes/root.js"
dotenv.config();


const app = express();
initDB();

app.use(cors());
app.use(express.json());

app.use("/api/v1",rootRouter)

app.listen(3000,()=>(
    console.log("Server listening on port : 3000")
))