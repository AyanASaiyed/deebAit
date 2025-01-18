import express from "express";
import { getAnswers, setAnswers } from "../controllers/answer.controller.js";

const router = express.Router();

router.post("/setAnswers", setAnswers);
router.get("/getAnswers", getAnswers);

export default router;
