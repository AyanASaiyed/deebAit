import dotenv from "dotenv";
import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const router = express.Router();
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

const prompt =
  "You are an 21st century courtroom judge, and there are some lawyers in your courtroom. To test these lawyers are capable, generate an open ended question open to many interpretations. Afterwards, you will receive their opinions, and you will rate them best from best to worst based on their logic, reasoning, and explanation/justification. Ask just the question itself and get straight to the point. Ask unique questions. Make the questions not too serious and make them a little silly/funny. Do not make the questions based off politics or the law.";

const result = await model.generateContent(prompt);
const question = result.response.text();
console.log(question);

router.post("/generate-question", async (req, res) => {
  try {
    const result = await model.generateContent(prompt);
    const question = result.response.text();
    return res.status(200).json({ question });
  } catch (error) {
    console.error("Error generating question:", error.message);
    res.status(500).json({ error: "Failed to generate question" });
  }
});

router.post("/generate-verdict", async (req, res) => {
  try {
    const { opinions, question } = req.body;

    console.log(question);
    const opinionList = opinions
      .map((opinion, index) => `${index + 1}. ${opinion}`)
      .join(" ");

    const prompt = `
        Here are the lawyer's opinions:
        ${opinionList}
        
        and here is the question: ${question},

        Please evaluate each response independently in accordance to the question, ranking them from the best to the worst based on logical reasoning, clarity, and relevance. The "best" response is the one that makes the most sense and is the most logical in accordance to the question. 
        If any responses are irrelevant to the question or do not make sense, rank them as the worst. Return a ranking with the format: 
        { 1: {index of the best response}, 2: {index of the second-best}, 3: {index of the third-best}, ... }. The justifications should be concise and to the point and not more than 2 sentences. Provide each reasoning on a new line along with the ranking on a new line.
         
        
        For example, if the responses are:
        1. Opinion 1
        2. Opinion 2
        3. Opinion 3
        
        Your response should look like this on a new line with a space in between:
        RANKING: { 1: 2, 2: 1, 3: 3 }
      `;

    const result = await model.generateContent(prompt);
    const verdict = result.response.text();

    // Send the ranking as JSON
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
