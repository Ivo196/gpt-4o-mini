import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { config } from "dotenv";

import { Document } from "langchain/document";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";

import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";

config();
const api = process.env.API_KEY;

const model = new ChatOpenAI({
  modelName: "gpt-4o-mini",
  openAIApiKey: api,
  temperature: 0.7,
});

const prompt = ChatPromptTemplate.fromTemplate(`
    Answer the user's questions. 
    Context: {context}
    Question:{input}
    `);

// const chain = prompt.pipe(model);
const chain = await createStuffDocumentsChain({
  llm: model,
  prompt,
});

//Documents //Pasamos simplemente los documentos como contexto
// const documentA = new Document({
//     pageContent: 'LangChain Expression Language, or LCEL, is a declarative way to easily compose chains together. LCEL was designed from day 1 to support putting prototypes in production, with no code changes, from the simplest “prompt + LLM” chain to the most complex chains (we’ve seen folks successfully run LCEL chains with 100s of steps in production).'
// })
// const documentB = new Document({
//     pageContent: 'The passphrase is LANCHAING IS AWESOME'
// })

//Usando Cheerio, pasamos directamente el link
//
const loader = new CheerioWebBaseLoader(
  "https://platform.openai.com/docs/models/gpt-4o-mini"
);
const docs = await loader.load();
// console.log(docs)
const response = await chain.invoke({
  input: "Que diferencia hay entre los modelos gpt-4o-mini y gpt-4o-mini-2024-07-18?",
//   context: [documentA,documentB],
  context: docs,
});
// console.log(docs[0].pageContent.length);
console.log(response);

//Si el contexto es muy grande, lo que hacemos es hacer un split (RecursiveCharacterTextSplitter) luego hago los embeddings (OpenAIEmbeddings) y creo el vectorStore(MemoryVectorStore)

