import { Router } from "express";
import { register, login,logout, verificarToken, eliminarUsuario, verUsuarios } from "../controllers/autenticacion.controller.js";
import dotenv from "dotenv";
dotenv.config();

const router=Router()
const url=process.env.USUARIOS_BASEURL;

router.post(`${url}register`,register)
router.post(`${url}login`,login)
router.post(`${url}logout`,logout)
// router.get("/perfil",authRequired,perfil)
router.post(`${url}verificarToken`,verificarToken)
router.get(`${url}verAllUsers`,verUsuarios)
router.delete(`${url}deleteUser/:id`,eliminarUsuario)


export default router;