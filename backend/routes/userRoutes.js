import { Router } from "express";
import { z } from "zod"
const router = Router();

export default router;

const signupUserSchema = z.object({
    username: z.string().min(3).max(30),
    firstName:z.string().max(50),
    lastName:z.string().max(50),
    password:z.string().min(6),

});

router.post("/signup",(req,res)=>{
    const body = req.body;
    const { success } = signupUserSchema.safeparse(req.body);
    if(!success){
       return res.json({
            message : "Email already taken / Incorrect inputs"
        })
    }
    

})