import express from "express";
import {
  getAllNodes,
  getNodeById,
  createNodes,
  updateNode,
  deleteNodes,
} from "../controllers/notesController.js";

const router = express.Router();

router.get("/", getAllNodes);
router.get("/:id", getNodeById);
router.post("/", createNodes);
router.put("/:id", updateNode);
router.delete("/:id", deleteNodes);

export default router;
