import OpenAI from "openai";
console.log({ e: process.env.OPENAI_API_KEY });
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default openai;
