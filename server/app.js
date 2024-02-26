import express from "express";
import productosRoutes from "./routes/productos.routes.js";
import usuariosRoutes from "./routes/usuarios.routes.js";
import notificacionesRoutes from "./routes/notificaciones.routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

const app = express();

const dev = process.env.URLDEV;
const produccion = process.env.URLPROD;

app.use(cors({ origin: dev, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use(productosRoutes);
app.use(usuariosRoutes);
app.use(notificacionesRoutes);

export default app;
