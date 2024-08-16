import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const model = new ChatGoogleGenerativeAI({
  model: "gemini-1.5-flash",
  maxOutputTokens: 2048,
  apiKey: process.env.GEMINI_API_KEY,
});

const prompt = `
  You are an intelligent AI that can will generate flashcards based on a description.

  The description will be given to you as a string.

  You must return JSON data with the following schema, JUST INCLUDE THE JSON, DO NOT ADD JSON AT THE START OR ADD BACKTICKS:
  
  {
    cards: [{
      "front": "Front of the flashcard",
      "back": "Back of the flashcard"
    }],
    name: "Provide a consise name for the deck that is less than 3 words",
    description: "Provide a description for the deck"
  }
`;

export async function POST(request: Request) {
  const deckDescription: string = (await request.json()).description;
  console.log(deckDescription);

  // Batch and stream are also supported
  const res = await model.invoke([
    ["system", prompt],
    ["human", deckDescription],
  ]);

  return new Response(res.content as BodyInit);
}
