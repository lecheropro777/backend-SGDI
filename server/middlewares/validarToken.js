import jwt from "jsonwebtoken"
import dotenv from "dotenv";
dotenv.config();

export const authRequired=(req,res,next)=>{
      const {token} = req.body
      if(!token)return res.status(401).json({message:"no token"})

      jwt.verify(token,process.env.TOKEN_JWT,(err,user)=>{
        if(err) return res.status(403)
        console.log(user)
        req.user=user
        next()
      })
    
}