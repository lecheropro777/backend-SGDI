import mongoose from "mongoose";

const UsuarioSchema = new mongoose.Schema({
  Usuario: {
    type: String,
    required:true,
    trim: true,
    unique:true
  },
  Contrasena: {
    type: String,
    required:true,
    trim: true,
  },
  Rol:{
    type:String,
    required:true,
    trim:true
  }
},{
  timestamps:true
});

export default mongoose.model('usuario',UsuarioSchema)