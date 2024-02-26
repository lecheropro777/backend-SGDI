import { Router } from "express";
import { notificacionPendientes } from "../controllers/notificaciones.controller.js";
import dotenv from "dotenv";
dotenv.config();
const router = Router()

router.post(process.env.NOTIFICACIONES_BASEURL, notificacionPendientes)
    
export default router

