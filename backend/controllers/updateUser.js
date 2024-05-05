import { z } from "zod";
import { User } from "../db/Schema.js";

const updateBodySchema = z.object({
    password : z.string(),
    firstName : z.string(),
    lastName : z.string(),
})

export const updateUser = async(req,res) => {
    const { success } = updateBodySchema.safeParse(req.body);

    if(!success){
        res.json({
            message : "Error while updating info",
        })
    }

    await User.updateOne({ _id: req.userId }, req.body);

    res.json({
        message : "Updated Successfully"
    })
}