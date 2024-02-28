import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
    Usuario:{
        type:String,
        required:true
    },
    Accion:{
        type:String,
        required:true
    },
    Descripcion:{
      type:String,
      required:true  
    }
},{
    timestamps:true
})
export default mongoose.model("Log", logSchema);
