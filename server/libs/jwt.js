import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export function crearToken(payload) {
  return new Promise((resolve,reject)=>{
    jwt.sign(
        payload,
        process.env.TOKEN_JWT,
        {
          expiresIn: "30m",
        },
        (err, token) => {
          if (err) reject(err);
          resolve(token)
        }
      );
  })
}
