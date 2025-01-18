import { VertexAI } from "@google-cloud/vertexai";
import dotenv from "dotenv";
dotenv.config();

const vertexAI = new VertexAI({
  project: process.env.PROJECT_ID,
  location: "us-central1",
});

const generativeModel = vertexAI.getGenerativeModel({
  model: "gemini-1.5-flash-001",
});

export async function init_gemini_bot() {
  let prompt =
    "You are an 21st century courtroom judge, and there are some lawyers in your courtroom. To test these lawyers are capable, generate an open ended question open to many interpretations. Afterwards, you will receive their opinions, and you will rate them best from best to worst based on their logic, reasoning, and explanation/justification. Ask just the question itself and get straight to the point.";
  try {
    const resp = await generativeModel.generateContent(prompt);
    const contentResponse = resp.response;
    return contentResponse.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("Error in init_gemini_bot:", error.message);
    throw error;
  }
}

export async function generate_verdict(opinions) {
  let prompt = "Here are the lawyer's opinions: ";
  for (let i = 1; i <= opinions.length; i++) {
    prompt += `${i}. ${opinions[i - 1]} `;
  }
  prompt +=
    "Please give us your thoughts, your holiness. Do not go above 150 words per opinion, and feel free to talk about anything. Make sure to dislike one.";
  try {
    const resp = await generativeModel.generateContent(prompt);
    const contentResponse = resp.response;
    return contentResponse.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("Error in generate_verdict:", error.message);
    throw error;
  }
}

export async function generate_ranking(opinions) {
  let prompt = "Here are the lawyer's opinions once again to remind you: ";
  for (let i = 1; i <= opinions.length; i++) {
    prompt += `${i}. ${opinions[i - 1]} `;
  }
  prompt +=
    "RETURN ONLY a JSON of your rankings in the following format: {1: {index of the best opinion}, 2: {etc}, 3: {}, 4: {}}";

  try {
    const resp = await generativeModel.generateContent(prompt);
    const contentResponse = resp.response;
    return contentResponse.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("Error in generate_ranking:", error.message);
    throw error;
  }
}
