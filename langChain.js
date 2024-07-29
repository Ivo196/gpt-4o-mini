import { config } from 'dotenv';
import { ChatOpenAI } from '@langchain/openai';
import { ChatPromptTemplate } from '@langchain/core/prompts';

config();

const api = process.env.API_KEY;

const chatModel = new ChatOpenAI({
    apiKey: api,
    modelName: 'gpt-4o-mini',
    temperature: 0.7,
    maxTokens:200
});

const prompt = ChatPromptTemplate.fromMessages([
    ["system", "Eres un asistente culinario que responde preguntas de manera muy breve"],
    ["user", "Cuales son los ingredientes para preparar {input}"],
]);

const chain = prompt.pipe(chatModel); //pipi conecta la plantilla con el modelo, creando una cadena, el que se puede invoncar para generara respuestas.

async function invokeChain() {
    const response = await chain.invoke({ //Envia la prompt al modelo y espera la respuesta.
        input: "Tarta de atun",
    });
    console.log(response.content);
}

invokeChain();
