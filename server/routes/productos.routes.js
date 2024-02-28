import {Router} from "express";
import { obtenerProductos, obtenerProductoPorId, crearProducto, actualizarProductoPorId, eliminarProductoPorId, retirarCantidadDeProductoPorId, aumentarCantidadDeProductoPorId, verProductoPorCodigoBarras, verPendientes } from "../controllers/productos.controllers.js";
import dotenv from "dotenv";
import { verLogs } from "../controllers/logs.controller.js";
dotenv.config();
const router=Router()
const BaseUrlProductos=process.env.PRODUCTOS_BASEURL;

router.get(`${BaseUrlProductos}`,obtenerProductos)

router.post(`${BaseUrlProductos}`,crearProducto)

router.get(`${BaseUrlProductos}/:id`,obtenerProductoPorId)

router.put(`${BaseUrlProductos}/:id`,actualizarProductoPorId)

router.post(`${BaseUrlProductos}/eliminar/:id`,eliminarProductoPorId)

router.put(`${BaseUrlProductos}/retirar/:id`,retirarCantidadDeProductoPorId)

router.put(`${BaseUrlProductos}/aumentar/:id`,aumentarCantidadDeProductoPorId)

router.post(`${BaseUrlProductos}/verProductoPorCodigoBarras/:codigoBarras`,verProductoPorCodigoBarras)

router.post(`${BaseUrlProductos}/Pendientes`,verPendientes)

router.get(`/back/logs`,verLogs)


export default router;