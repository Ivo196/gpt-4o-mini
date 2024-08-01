import { ChatOpenAI } from "@langchain/openai";
import { config } from "dotenv";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { StructuredChatOutputParser } from "langchain/agents";
import { StructuredOutputParser } from "langchain/output_parsers";

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
// // Create the parser
// const parser = new StringOutputParser()

// // Create a chain 
// const chain =  prompt.pipe(model).pipe(parser)

// // Call the chain
// const responde = await chain.invoke({
//     input:'Dog'})

// console.log(responde)


//----------------------------------------//

// Structured otuput parser 
async function callStructuredParser() {
    const prompt = ChatPromptTemplate.fromTemplate(`
        Extract information from the following phrase. 
        Formatting Instructions: {format_instructions} 
        Phrase: {phrase}
    `)
    const outputParser = StructuredOutputParser.fromNamesAndDescriptions({ //Esto es lo que convierte en format_instructions y se lo paso a la prompt
        name: 'The name of the person',
        age: 'The age of the person'
    })

    const chain = prompt.pipe(model).pipe(outputParser)

    return await chain.invoke({
        format_instructions: outputParser.getFormatInstructions(),
        phrase:'Max is 30 years old'
    })
}

const response = await callStructuredParser() //Observamos que devuelve un objeto de js
console.log(response)