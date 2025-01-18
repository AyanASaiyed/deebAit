import dotenv from "dotenv";
import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const router = express.Router();
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const prompt =
  "You are an 21st century courtroom judge, and there are some lawyers in your courtroom. To test these lawyers are capable, generate an open ended question open to many interpretations. Afterwards, you will receive their opinions, and you will rate them best from best to worst based on their logic, reasoning, and explanation/justification. Ask just the question itself and get straight to the point. Ask unique questions. Make the questions not too serious and make them a little silly/funny.";

const result = await model.generateContent(prompt);
const question = result.response.text();
console.log(question);

router.post("/generate-question", async (req, res) => {
  try {
    const result = await model.generateContent(prompt);
    const question = result.response.text();
    res.status(200).json({ question });
  } catch (error) {
    console.error("Error generating question:", error.message);
    res.status(500).json({ error: "Failed to generate question" });
  }
});

router.post("/generate-verdict", async (req, res) => {
  try {
    const { opinions } = req.body;
    const prompt = `Here are the lawyer's opinions: ${opinions.join(
      " "
    )}. Please give us your thoughts on each response and do not go above 2 sentences. And return a list from the best response to the worst response. If the atleast one of the inputs is bad, rank ONLY that one. The "best" response is the response that makes the most sense and is the most logical out of the bunch even if the bunch is all meaningless or similiar. if the responses are not even correlated to the question, they are deemed bad `;
    const result = await model.generateContent(prompt);
    const verdict = result.response.text();
    res.status(200).json({ verdict });
  } catch (error) {
    console.error("Error generating verdict:", error.message);
    res.status(500).json({ error: "Failed to generate verdict" });
  }
});

router.post("/generate-ranking", async (req, res) => {
  try {
    const { opinions } = req.body;
    if (!opinions || !Array.isArray(opinions)) {
      return res.status(400).json({ error: "Opinions must be an array" });
    }

    const rankings = await generate_ranking(opinions);

    res.status(200).json({ rankings });
  } catch (error) {
    console.error("Error generating ranking:", error.message);
    res.status(500).json({ error: "Failed to generate rankings" });
  }
});

export const gemRouter = router;
