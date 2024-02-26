import Post from "../models/Post.js";
import { uploadImage, deleteImage } from "../libs/cloudinary.js";
import fs from "fs-extra";

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
    const { Nombre, Cantidad, CantidadMinima, Unidad, Proveedor } = req.body;
    let image;
    if (req.files?.image) {
      const result = await uploadImage(req.files.image.tempFilePath);
      await fs.remove(req.files.image.tempFilePath);
      image = { url: result.secure_url, public_id: result.public_id };
    }
    const newPost = new Post({
      Nombre,
      Cantidad,
      CantidadMinima,
      Unidad,
      Proveedor,
      image,
    });
    await newPost.save();
    res.json(newPost);
  } catch (error) {
    return res.status(500).json("error");
  }
};
export const actualizarProductoPorId = async (req, res) => {
  try {
    const updatePost = await Post.updateOne({ _id: req.params.id }, req.body, {
      new: true,
    });
    return res.send(updatePost);
  } catch (error) {
    return res.status(500).json("error");
  }
};
export const eliminarProductoPorId = async (req, res) => {
  try {
    const postRemoved = await Post.findByIdAndDelete(req.params.id);
    if (!postRemoved) return res.sendStatus(404);
    if (postRemoved.image.public_id) {
      await deleteImage(postRemoved.image.public_id);
    }
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json("error");
  }
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
      console.log(respuesta);
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
    const { Cantidad } = req.body;
    if (!req.params.id) {
      return;
    }
    if (!req.body) {
      return;
    }
    const cantidad = Cantidad;
    const objetoActualizado = await Post.updateOne(
      { _id: req.params.id },
      { $inc: { Cantidad: -cantidad } }
    );
    if (!objetoActualizado) {
      return;
    }
    return res.send(objetoActualizado);
  } catch (error) {
    return res.status(500).json("error");
  }
};

export const aumentarCantidadDeProductoPorId = async (req, res) => {
  try {
    const { Cantidad } = req.body;
    if (!req.params.id) {
      return;
    }
    if (!req.body) {
      return;
    }
    const cantidad = Cantidad;
    const objetoActualizado = await Post.updateOne(
      { _id: req.params.id },
      { $inc: { Cantidad: +cantidad } }
    );
    if (!objetoActualizado) {
      return;
    }
    return res.send(objetoActualizado);
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
    if(consultarPendientes){
      return res.send(consultarPendientes);
    }
    else return res.send(null)
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
    if(consultarPendientes){
      return consultarPendientes;
    }
    else return res.send(null)
  } catch (error) {
    return;
  }
};
