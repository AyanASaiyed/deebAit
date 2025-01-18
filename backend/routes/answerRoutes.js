import express from "express";
import { setAnswers } from "../controllers/answer.controller.js";

const router = express.Router();

router.post("/setAnswers", setAnswers);
export default router;
