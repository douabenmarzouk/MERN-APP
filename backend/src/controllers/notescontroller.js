import Note from "../models/Note.js";
export async function getAllNodes(req, res) {
  try {
      const notes=await Note.find();
      res.status(200).json(notes);
  } catch (error) {
    console.error("Error in getAllNodes controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
export async function createNodes(req, res) {
    console.log("req.body:", req.body);
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title, content });
    const savednote=await newNote.save();
    res.status(201).json(savednote);
  } 
  catch (err) {  // ici c'est 'err'
    console.error("Error in create controller:", err); // utiliser 'err' ici aussi
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function updateNode(req, res) {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true, runValidators: true } // 👈 renvoie le doc modifié + applique les validateurs du schema
    );
    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({
      message: "Note updated successfully",
      note: updatedNote,
    });
  } catch (err) {
    console.error("Error in updateNode controller:", err);
    res.status(500).json({ message: "Internal server error" }); }
}
export async  function deleteNodes(req, res) {
  try{
    const deletedNote= await Note.findByIdAndDelete(
    req.params.id
  );
  if(!updateNode){
    return res.status(404).json({message:"Note not found"});
  }
  res.status(200).json({message:"Note deleted successfuly",note:deleteNodes,});
}
  catch(err){
    console.error("Error in updateNode controller:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getNodeById(req, res) {
  try {
    const getNote = await Note.findById(req.params.id);

    if (!getNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({
      message: "Note is here",
      note: getNote,
    });
  } catch (err) {
    console.error("Error in getNodeById controller:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}
