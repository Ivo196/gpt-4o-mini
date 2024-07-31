import { ChatOpenAI } from "@langchain/openai";
import { config } from "dotenv";

config()

const api = process.env.API_KEY

const model = new ChatOpenAI({
    openAIApiKey:api,
    modelName:'gpt-4o-mini',
    temperature:0.7,
})

// Respuesta invocada 
// const response = await model.invoke('Hola como estas? ')
// console.log(response.content)

// Respuesta en stream 
const response = await model.stream('Crea un texto de 100 palabras')

for await (const chunk of response){
    console.log(chunk?.content)
}