import { ChatOpenAI } from "@langchain/openai";
import { config } from "dotenv";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

config()

const api = process.env.API_KEY
//Instanciamos el modelo 
const model = new ChatOpenAI({
    openAIApiKey:api,
    modelName:'gpt-4o-mini',
    temperature:0.7,
})

// Create a prompt template
const prompt =  ChatPromptTemplate.fromMessages([
    ['system','Generate a joke based on the word provided by the user.'],
    ['human','{input}']
])

// Create the parser
const parser = new StringOutputParser()

// Create a chain 
const chain =  prompt.pipe(model).pipe(parser)

// Call the chain
const responde = await chain.invoke({
    input:'Dog'})

console.log(responde)