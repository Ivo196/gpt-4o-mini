import { config } from "dotenv";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
import { createOpenAIFunctionsAgent, AgentExecutor } from "langchain/agents"; //Es lo mismo que chain e invoke, pero para agentes
import { TavilySearchResults } from "@langchain/community/tools/tavily_search"; //Busca información en tiempo real
import readline from 'readline'
config()
const api = process.env.API_KEY

const model = new ChatOpenAI({
    modelName: 'gpt-4o-mini',
    openAIApiKey:api,
    temperature:0.7
})

const prompt = ChatPromptTemplate.fromMessages([
    ('system','You are a helpfull assistant called max'),
    ('humman','{input}'),
    new MessagesPlaceholder('agent_scratchpad')
])

//Create and assing the tools
const searchTool = new TavilySearchResults()
const tools = [searchTool]

//Create the agent
const agent = await createOpenAIFunctionsAgent({
    llm:model,
    prompt,
    tools
})

//Create the Agent Executor
const agentExecutor = new AgentExecutor({
    agent,
    tools
})


// //Call the agent 
// const response = await agentExecutor.invoke({
//     input:'cual es el clima hoy dia en mendoza argentina?'
// })
// console.log(response)


//Get user INPUT
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const askQuestion = () => { 
    rl.question('User: ', async (input) => {
        //Call the agent 
        const response = await agentExecutor.invoke({
        input:input 
        })
        console.log('Agent: ',response.output)
        askQuestion()
    })
 }
 askQuestion()
