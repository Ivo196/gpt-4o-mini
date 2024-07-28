import OpenAI from "openai";
import { config } from "dotenv";

config()
const API_KEY = process.env.API_KEY

const openai = new OpenAI({
    apiKey:API_KEY
})

// async function main() {
//     const completion = await openai.chat.completions.create({
//         messages: [{role:'system', content:'You are a helpful assistant.'}],
//         model:'gpt-4o-mini',
        
//     })
//     console.log(completion.choices[0])
// }

async function openAIResponse(prompt) {
    const completion = await openai.chat.completions.create({
        messages:[{role:'user', content:prompt}],
        model:'gpt-4o-mini',
        max_tokens: 150, //Máximo número de tokens en la respuesta
        temperature:0.7 //Creatividad de la respuesta


    })
    console.log(completion.choices[0])
}
openAIResponse('Dame 5 lenguajes de programación')
