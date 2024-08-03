import { ChatOpenAI } from "@langchain/openai";
import { config } from "dotenv";
import { ChatPromptTemplate } from "@langchain/core/prompts";

//Memory import 
import { BufferMemory } from "langchain/memory";
import { ConversationChain } from "langchain/chains";
import { UpstashRedisChatMessageHistory } from "@langchain/community/stores/message/upstash_redis";

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

const upStashChatHistory = new UpstashRedisChatMessageHistory({
    sessionId:'chat1', //Simpre que queramos podemos usar estas conversaciones
    config:{
        url:process.env.UPSTASH_REDIS_URL,
        token: process.env.UPSTASH_REST_TOKEN
    }
})

const memory = new BufferMemory({
    memoryKey: 'history',
    chatHistory:upStashChatHistory
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
// console.log(await memory.loadMemoryVariables())
// const input1 = {
//     input:'Valentina es una mujer de 21 años, estudia y trabaja en la cocina de un hotel y actualmente esta trabajando y dando forma a linkedin en una empresa llamada VioAI'
// }
// const responde1 = await chain.invoke(input1)
// console.log(responde1)

console.log('Update History: ',await memory.loadMemoryVariables())
const input2 = {
    input:'Quien en valentina? cuantos años tiene? y que esta haciendo en este momento?'
}
const responde2 = await chain.invoke(input2)
console.log(responde2)