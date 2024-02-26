import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export async function conn() {
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI);
    console.log("conexion establecida: ", db.connection.name);
  } catch (error) {
    console.error(error);
  }
}
