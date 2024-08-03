import { ChatOpenAI } from "@langchain/openai";
import { config } from "dotenv";
import { ChatPromptTemplate } from "@langchain/core/prompts";

//Memory import 
import { BufferMemory } from "langchain/memory";
import { ConversationChain } from "langchain/chains";

config()

const api = process.env.API_KEY

const model = new ChatOpenAI({
    openAIApiKey:api,
    modelName:'gpt-4o-mini',
    temperature:0.7,
})

// Create a prompt template 1
const prompt =  ChatPromptTemplate.fromTemplate(`
    You are an AI assistant 
    History: {history}
    {input}
`)

const memory = new BufferMemory({
    memoryKey: 'history'
})

// Using a chain Classes
const chain = new ConversationChain({
    llm:model,
    prompt,
    memory 
})

//LCEL
// const chain =  prompt.pipe(model)

//Get response
console.log(await memory.loadMemoryVariables())
const input1 = {
    input:'The passphrase is HELLOWORLD'
}
const responde1 = await chain.invoke(input1)
console.log(responde1)

console.log('Update History: ',await memory.loadMemoryVariables())
const input2 = {
    input:'what is the passphrase?'
}
const responde2 = await chain.invoke(input2)
console.log(responde2)