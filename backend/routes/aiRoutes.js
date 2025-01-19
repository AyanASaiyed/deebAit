import express from "express";
import {
  init_gemini_bot,
  generate_verdict,
} from "../googleCloud.js";

const aiRouter = express.Router();

aiRouter.get("/generate-question", async (req, res) => {
  try {
    const question = await init_gemini_bot();
    res.status(200).json({ question });
  } catch (error) {
    console.error("Error generating question:", error.message);
    res.status(500).json({ error: "Failed to generate question" });
  }
});

aiRouter.post("/generate-verdict", async (req, res) => {
  try {
    const { opinions } = req.body;
    const verdict = await generate_verdict(opinions);
    res.status(200).json({ verdict });
  } catch (error) {
    console.error("Error generating verdict:", error.message);
    res.status(500).json({ error: "Failed to generate verdict" });
  }
});

export default aiRouter;
