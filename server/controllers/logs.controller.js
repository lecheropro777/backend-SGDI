import Log from "../models/Log.js";



export const guardarLog = async(Usuario, Accion, Descripcion) => {
  if (!Usuario) {
    return;
  }
  if (!Accion) {
    return;
  }
  if (!Descripcion) {
    return;
  }
  const newLog= Log({
    Usuario,
    Accion,
    Descripcion
  });
  await newLog.save()
  return;
};
