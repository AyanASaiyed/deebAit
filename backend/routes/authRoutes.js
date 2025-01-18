import express from "express";
import { players } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/players", players);

export default router;
