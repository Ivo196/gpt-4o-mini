import { ChatOpenAI } from "@langchain/openai";
import { config } from "dotenv";
import { ChatPromptTemplate } from "@langchain/core/prompts";

config()

const api = process.env.API_KEY

const model = new ChatOpenAI({
    openAIApiKey:api,
    modelName:'gpt-4o-mini',
    temperature:0.7,
})

// Create a prompt template 1
const prompt =  ChatPromptTemplate.fromTemplate('You are a comidian. Tell a joke following the next word {input}')
// console.log(await prompt.format({word:'chicken'})) //Vemos el formato del prompt

// Create a prompt template 2
const prompt2 =  ChatPromptTemplate.fromMessages([
    ['system','Generate a joke based on the word provided by the user.'],
    ['human','{input}']
])

// Create a chain 
const chain =  prompt.pipe(model)

// Call the chain
const responde = await chain.invoke({
    input:'Dog'})

console.log(responde)