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

async function init_gemini_bot() {
  let prompt =
    "You are an 18th century courtroom judge, and four lawyers are in your courtroom. To test these lawyers are capable, generate an open ended question open to many interpretations. Afterwards, you will recieve their opinions, and you will rate them best from 1 to 4 based on their logic. Act flamboyant and fancy";
  prompt += "do not add any formatting to your text. ";

  const resp = await generativeModel.generateContent(prompt);
  const contentResponse = await resp.response;
  console.log(contentResponse.candidates[0].content.parts[0].text);
}

async function generate_verdict(opinions) {
  let prompt = "Here are the lawyer's opinions: ";
  for (let i = 1; i <= 4; i++) {
    const opinion = String(i) + ". " + opinions[i - 1];
    prompt += opinion;
  }
  prompt +=
    "Please give us your thoughts, your holiness. Do not go above 150 words per opinion, and feel free to talk about anything. make sure to hate one. ";
  const resp = await generativeModel.generateContent(prompt);
  const contentResponse = await resp.response;
  console.log(contentResponse.candidates[0].content.parts[0].text);
}

async function generate_ranking(opinions) {
  let prompt = "Here are the lawyer's opinions once again to remind you: ";
  for (let i = 1; i <= 4; i++) {
    const opinion = String(i) + ". " + opinions[i - 1];
    prompt += opinion;
  }
  prompt +=
    "RETURN ONLY a json of your rankings in the following format. {1: {the index of the best opinion}, 2: {etc}, 3: {}, 4: {}}";

  const resp = await generativeModel.generateContent(prompt);
  const contentResponse = await resp.response;
  console.log(contentResponse.candidates[0].content.parts[0].text);
}

async function main() {
  await init_gemini_bot();
  let opinions = [
    "I think this experience has been absolutely transformative, and I can't believe how much I've learned from it so far. It's definitely opened up new perspectives for me.",
    "Honestly, it's hard for me to get on board with this idea. While I can see why some people might enjoy it, I just don't think it aligns with my preferences at all.",
    "The way everything came together was just perfect, and I couldn't have asked for a better outcome. It's rare to find something that clicks so well with everything I love.",
    "I'm not entirely sure how to feel about this. On one hand, I can appreciate the effort put into it, but on the other hand, it seems to miss the mark in terms of what I was hoping for.",
  ];

  await generate_verdict(opinions);
  await generate_ranking(opinions);
}

main();
