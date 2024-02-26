import webPush from "../webpush.js";
import { verPendientesNotificaciones } from "./productos.controllers.js";

const WebPush = webPush;
let pushSubscriptions = null;

export const notificacionPendientes = async (req, res) => {
  pushSubscriptions = req.body;
  const pendientes = await verPendientesNotificaciones();
  if (pendientes.length >0) {
    console.log(pendientes);
    res.sendStatus(200).json();
    const payload = JSON.stringify({
      title: "Almacen Diagnocons",
      message: "Pendientes",
    });
    try {
      await WebPush.sendNotification(pushSubscriptions, payload);
      console.log("Notificacion enviada");
    } catch (error) {
      res.send(error);
    }
  } else {
    console.log("No pendientes");
    return;
  }
};
