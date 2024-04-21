import { Router } from "express";
import { z } from "zod";
import { User } from "../db/Schema.js";
import { jwt } from "jsonwebtoken"
import { JWT_SECRET } from "../config/config"

const router = Router();

const signupUserSchema = z.object({
    username: z.string().min(3).max(30),
    firstName: z.string().max(50),
    lastName: z.string().max(50),
    password: z.string().min(6),
});

router.post("/signup", async (req, res) => {
    try {
        const body = req.body;
        const parsedResults = signupUserSchema.safeParse(body);

        if (!parsedResults.success) {
            return res.status(400).json({
                message: "Incorrect inputs",
                error: parsedResults.error,
            });
        }

        const existingUser = await User.findOne({ username: body.username });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists.",
            });
        }

        const newUser = await User.create(body);

        const userId = newUser._id

        const token = jwt.sign({
            userId
        },JWT_SECRET)

        res.json({
            message: "User Created Successfully",
            token: token,
        });

    } catch (error) {
        console.error("Error in signup:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post("/signin", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if the username exists
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        // Check if the password is correct
        if (password !== user.password) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        // If username and password are correct, generate a JWT token
        const token = jwt.sign({ userId: user._id }, JWT_SECRET);

        res.json({
            message: "User signed in successfully",
            token,
        });
    } catch (error) {
        console.error("Error in signin:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});




export default router;
