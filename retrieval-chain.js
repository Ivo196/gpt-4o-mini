import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { config } from "dotenv";

config()
const api = process.env.API_KEY 

const model = new ChatOpenAI({
    modelName:'gpt-4o-mini',
    openAIApiKey: api,
    temperature: 0.7
})

const prompt = ChatPromptTemplate.fromTemplate(`
    Answer the user's questions. {input}
    `)

const chain =  prompt.pipe(model)

const response = await chain.invoke({
    input: 'Que modelo eres?'
})
console.log(response)