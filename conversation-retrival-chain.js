import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { config } from "dotenv";

import { AIMessage, HumanMessage } from "@langchain/core/messages";

config();

const api = process.env.API_KEY;

const model = new ChatOpenAI({
  modelName: "gpt-4o-mini",
  openAIApiKey: api,
  temperature: 0.7,
});

const prompt = ChatPromptTemplate.fromTemplate(`
    Answer the user's questions. 
    Chat History: {chatHistory}
    Question:{input}
    `);

const chain = prompt.pipe(model);

//Chat History
const chatHistory = [
  new HumanMessage("Hello"),
  new AIMessage("Hi, how can I help you?"),
  new HumanMessage("My name is Leon"),
  new AIMessage("Hi Leon, how can I help you?"),
  new HumanMessage("What is LCEL"),
  new AIMessage("LCEL stands for lanchain Expression Language"),
];

const response = await chain.invoke({
  input: "What is it?",
  chatHistory: chatHistory,
});

console.log(response);
