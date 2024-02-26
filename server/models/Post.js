import mongoose from "mongoose";
import { uuid } from 'uuidv4';
const postSchema = new mongoose.Schema({
  CodigoBarras:{
    type: String,
    trim: true,
    unique: true,
    default: uuid
  },
  Nombre: {
    type: String,
    trim: true,
    required:true
  },
  Cantidad: {
    type: Number,
    trim: true,
    required:true
  },
  CantidadMinima:{
    type: Number,
    trim: true,
    required:true
  },
  Unidad: {
    type: String,
    trim: true,
    required:true
  },
  Proveedor:{
    type:String,
    trim: true,
    },
  image: {
    url: String,
    public_id: String,
  },
},{
  timestamps:true
});
export default mongoose.model("Post", postSchema);
