import { JWT_SECRET } from "../config/config"
import { jwt } from "jsonwebtoken"

export const authMiddleware = async(req,res,next) => {
    const authHeader = req.header.authorization

    if(!authHeader || !authHeader.startsWith('Bearer' )){
        return res.status(401).json({
            message : "Unauthorized"
        })
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token,JWT_SECRET)

        if(decoded.userId){
            req.userId = decoded.userId;
            next()
        }
        else {
            return res.status(403).json({})
        } 
    } catch (err){
        return res.status(403).json({});
    }
};