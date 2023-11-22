import "dotenv/config";
import { ChatGPTAPI, ChatGPTUnofficialProxyAPI } from "chatgpt";

import { promt } from "./promt.js";

const api = new ChatGPTAPI({
   apiKey: process.env.OPENAI_API_KEY || "",
 });

/* const api = new ChatGPTUnofficialProxyAPI({
  accessToken: process.env.OPENAI_API_KEY || "",
  apiReverseProxyUrl: "https://ai.fakeopen.com/api/conversation",
}); */

export const itIsOfensive = async (title: string, description: string) => {
  const response = await api.sendMessage(`Texto: ${title}. ${description}`, {
    parentMessageId: "d1f2a2b3-be8c-43e2-9058-dbd7e761486f",
    conversationId: "851e0799-33a8-4ac7-b87f-b31fd0129ce1",
  });

  const responseText = response.text.toLocaleLowerCase();

  if (!responseText.includes("ok")) return true;

  return false;
};

export const validateMessage = async (
  categoryName: string,
  title: string,
  description: string
) => {
  const response = await api.sendMessage(
    promt(categoryName, title, description),
    {
      parentMessageId: "3e81e07a-d4a1-499e-a3a0-74278f750b88",
      conversationId: "77b1c477-fa3a-440c-9d08-6ee863003b5e",
    }
  );

  const responseText = response.text.toLocaleLowerCase();
  console.log(response.text);
  console.log("Contiene Ok?: ", responseText.includes("ok"));
  // if (!responseText.includes("ok")) {
  //   return { message: response.text };
  // }
  return responseText;
};

//https://api.pawan.krd/backend-api/conversation