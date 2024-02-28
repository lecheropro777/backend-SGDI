import Post from "../models/Post.js";
// import { uploadImage, deleteImage } from "../libs/cloudinary.js";
// import fs from "fs-extra";
import { guardarLog } from "./logs.controller.js";

export const obtenerProductos = async (req, res) => {
  try {
    const posts = await Post.find();
    res.send(posts);
  } catch (error) {
    return res.status(500).json("error");
  }
};
export const crearProducto = async (req, res) => {
  try {
    const { Nombre, Cantidad, CantidadMinima, Unidad, Proveedor, Usuario } =
      req.body;
    // let image;
    // if (req.files?.image) {
    //   const result = await uploadImage(req.files.image.tempFilePath);
    //   await fs.remove(req.files.image.tempFilePath);
    //   image = { url: result.secure_url, public_id: result.public_id };
    // }
    const newPost = new Post({
      Nombre,
      Cantidad,
      CantidadMinima,
      Unidad,
      Proveedor,
    });
    await newPost.save();
    await guardarLog(
      Usuario,
      "Guardar nuevo",
      `El usuario ${Usuario} guardo en la base de datos el producto: ${Nombre}`
    );
    res.json(newPost);
  } catch (error) {
    return res.status(500).json("error");
  }
};
export const actualizarProductoPorId = async (req, res) => {
  console.log("actualizando");
  try {
    const { Nombre, Cantidad, CantidadMinima, Unidad, Proveedor, Usuario } =
      req.body;
    const updatePost = await Post.updateOne(
      { _id: req.params.id },
      { Nombre, Cantidad, CantidadMinima, Unidad, Proveedor },
      {
        new: true,
      }
    );
    await guardarLog(
      Usuario,
      "Actualizar",
      `El usuario ${Usuario} actualizo en la base de datos el producto: ${Nombre}`
    );
    return res.send(updatePost);
  } catch (error) {
    return res.status(500).json("error al actualizar");
  }
};
export const eliminarProductoPorId = async (req, res) => {
  try {
    console.log(req.body);
    if (!req.body.usuario) {
      console.log("no hay ususario");
      return;
    }
    const { usuario } = req.body;
    const Nombre = await obtenerProductoPorIdFunction(req.params.id);
    if (!Nombre) {
      console.log("No hay nombre");
      return;
    }

    const postRemoved = await Post.findByIdAndDelete(req.params.id);
    if (!postRemoved) {
      return res.sendStatus(404);
    }
    // if (postRemoved.image.public_id) {
    //   await deleteImage(postRemoved.image.public_id);
    // }
    await guardarLog(
      usuario,
      "Eliminar",
      `El usuario ${usuario} elimino en la base de datos el producto: ${Nombre}`
    );
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json("error");
  }
};
const obtenerProductoPorIdFunction = async (id) => {
  const respuesta = await Post.findById(id);
  return respuesta.Nombre;
};
export const obtenerProductoPorId = async (req, res) => {
  try {
    if (!req.params.id) {
      return;
    }
    if (req.params.id) {
      const respuesta = await Post.findById(req.params.id);
      if (!respuesta) {
        return res.status(404);
      }
      res.send(respuesta);
    } else {
      return res.status(500).json("error");
    }
  } catch (error) {
    return;
  }
};

export const retirarCantidadDeProductoPorId = async (req, res) => {
  try {
    if (!req.params.id) {
      return;
    }
    if (!req.body) {
      return;
    }
    const { Cantidad, Usuario } = req.body;
    const Nombre = await obtenerProductoPorIdFunction(req.params.id);
    const cantidad = parseInt(Cantidad);
    const objetoActualizado = await Post.updateOne(
      { _id: req.params.id },
      { $inc: { Cantidad: -cantidad } }
    );
    if (!objetoActualizado) {
      return;
    }
    await guardarLog(
      Usuario,
      "Retirar",
      `El usuario ${Usuario} Retiro de la base de datos del producto: ${Nombre}  Cantidad: ${Cantidad}`
    );
    return res.send(objetoActualizado);
  } catch (error) {
    return res.status(500).json("error");
  }
};

export const aumentarCantidadDeProductoPorId = async (req, res) => {
  try {
    console.log(req.body);
    if (!req.params.id) {
      return;
    }
    if (!req.body) {
      return;
    }
    const { Cantidad, Usuario } = req.body;
    const Nombre = await obtenerProductoPorIdFunction(req.params.id);
    const cantidad = parseInt(Cantidad);
    const objetoActualizado = await Post.updateOne(
      { _id: req.params.id },
      { $inc: { Cantidad: +cantidad } }
    );
    if (!objetoActualizado) {
      return;
    }
    await guardarLog(
      Usuario,
      "Agregar",
      `El usuario ${Usuario} agrego en la base de datos del producto: ${Nombre}  Cantidad: ${Cantidad}`
    );
    return res.send("hola");
  } catch (error) {
    return;
  }
};

export const verProductoPorCodigoBarras = async (req, res) => {
  try {
    const { codigoBarras } = req.params;
    const respuesta = await Post.findOne({ CodigoBarras: codigoBarras });
    if (!respuesta) {
      res.sendStatus(404);
    }
    res.send(respuesta);
  } catch (error) {
    return;
  }
};
export const verPendientes = async (req, res) => {
  try {
    const consultarPendientes = await Post.aggregate([
      {
        $addFields: {
          menorQueCantidadMinima: { $lte: ["$Cantidad", "$CantidadMinima"] },
        },
      },
      {
        $match: { menorQueCantidadMinima: true },
      },
    ]);
    if (consultarPendientes) {
      return res.send(consultarPendientes);
    } else return res.send(null);
  } catch (error) {
    return;
  }
};

export const verPendientesNotificaciones = async (req, res) => {
  try {
    const consultarPendientes = await Post.aggregate([
      {
        $addFields: {
          menorQueCantidadMinima: { $lte: ["$Cantidad", "$CantidadMinima"] },
        },
      },
      {
        $match: { menorQueCantidadMinima: true },
      },
    ]);
    if (consultarPendientes) {
      return consultarPendientes;
    } else return res.send(null);
  } catch (error) {
    return;
  }
};
