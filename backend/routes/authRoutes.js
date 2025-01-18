import express from "express";
import { login, logout, session } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/login", login);
router.get("/session", session);
router.post("/logout", logout);

export default router;
