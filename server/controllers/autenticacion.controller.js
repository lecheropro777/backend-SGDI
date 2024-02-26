import usuario from "../models/Usuarios.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { crearToken } from "../libs/jwt.js";

export const register = async (req, res) => {
  try {
    const { Usuario, Contrasena, Rol } = req.body;
    const ContrasenaHash = await bcrypt.hash(Contrasena, 10);
    const buscarDuplicado = await usuario.findOne({ Usuario: Usuario });
    if (buscarDuplicado) {
      return res.sendStatus(400);
    }
    const nuevoUsuario = new usuario({
      Usuario,
      Contrasena: ContrasenaHash,
      Rol,
    });
    const usuarioGuardado = await nuevoUsuario.save();

    const token = await crearToken({ id: usuarioGuardado._id });

    res.cookie("token", token);
    res.json({
      id: usuarioGuardado._id,
      usuario: usuarioGuardado.Usuario,
      rol: usuarioGuardado.Rol,
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(404);
  }
};

export const login = async (req, res) => {
  if (req.body) {
    const { Usuario, Contrasena } = req.body;
    if (!Usuario) {
      res.json(null);
      return;
    }
    if (!Contrasena) {
      res.json(null);
      return;
    }
    const UsuarioEncontrado = await usuario.findOne({ Usuario });
    if (!UsuarioEncontrado) {
      return res.send(null);
    }
    const Coincide = await bcrypt.compare(
      Contrasena,
      UsuarioEncontrado.Contrasena
    );
    if (!Coincide) {
      return res.send(null);
    }

    const token = await crearToken({ id: UsuarioEncontrado._id });
    // res.cookie("token", token,{sameSite:"none",secure:true});
    res.json({
      id: UsuarioEncontrado._id,
      Usuario: UsuarioEncontrado.Usuario,
      Rol: UsuarioEncontrado.Rol,
      token: token,
    });
  } else {
    res.json(null);
  }
};

export const logout = async (req, res) => {
  await res.cookie("token", "", { expires: new Date(0) });
  return res.send("sesion cerrada");
};

export const verificarToken = async (req, res) => {
  if (!req.body) {
    return;
  }
  const { token } = req.body;
  if (!token) return res.status(401).json({ message: "no token" });
  jwt.verify(token, "diagnocons", async (err, user) => {
    if (err) {
      return res.status(401).json({ message: "no autorizado" });
    }
    const UsuarioEncontrado = await usuario.findById(user.id);
    if (!UsuarioEncontrado)
      return res.status(401).json({ message: "no usuario" });
    return res.json({
      id: UsuarioEncontrado._id,
      usuario: UsuarioEncontrado.Usuario,
      rol: UsuarioEncontrado.Rol,
    });
  });
};

export const verUsuarios = async (req, res) => {
  try {
    const usuariosEncontrados = await usuario.find();
    if (usuariosEncontrados) {
      const datosEspecificos = usuariosEncontrados.map((usuario) => {
        return {
          nombre: usuario.Usuario,
          Rol: usuario.Rol,
        };
      });
      res.send(datosEspecificos);
    } else {
      res.sendStatus(400);
    }
    return;
  } catch (error) {}
};
export const eliminarUsuario = async (req, res) => {
  try {
    const id = req.params.id;
    const eliminar = await usuario.findByIdAndDelete(id);
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(400);
  }
};
