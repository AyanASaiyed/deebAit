import { VertexAI } from "@google-cloud/vertexai";
import dotenv from "dotenv";
dotenv.config();

async function generate_from_text_input(projectId = process.env.PROJECT_ID) {
  const vertexAI = new VertexAI({
    project: projectId,
    location: "us-central1",
  });

  const generativeModel = vertexAI.getGenerativeModel({
    model: "gemini-1.5-flash-001",
  });

  const prompt = "his?";

  const resp = await generativeModel.generateContent(prompt);
  const contentResponse = await resp.response;
  console.log(contentResponse.candidates[0].content.parts[0].text);
}

generate_from_text_input();
