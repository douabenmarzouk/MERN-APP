import mongoose from "mongoose";
//1-create a shema 
//2-model based off that scchema 
const noteShema=new mongoose.Schema({
    title:{
      type:String,
      required:true,
    },
    content:{
      type:String,
      required:true,
    },
},
{timestamps:true}); //createAt ,updateAt

const Note=mongoose.model("NoteModel",noteShema)
export default Note;