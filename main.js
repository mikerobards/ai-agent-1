import './style.css'
import OpenAI from 'openai'
import { tools } from './tools'

export const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
})

// const availableFunctions = {
//   getCurrentWeather,
//   getLocation
// }

/**
 * Goal - build an agent that can answer any questions that might require knowledge about my 
 * current location and the current weather at my location.
 */

/**
 * PLAN:
 * 1. Design a well-written ReAct prompt
 * 2. Build a loop for my agent to run in.
 * 3. Parse any actions that the LLM determines are necessary
 * 4. End condition - final Answer is given
 */


async function agent(query) {
  const messages = [
    {
      role: "system",
      content: `You are a helpful AI agent. Give highly specific answers based on the information you're provided. 
      Prefer to gather information with the tools provided to you rather than giving basic, generic answers.`
    },
    {
      role: "user",
      content: query
    }
  ]

  const runner = openai.beta.chat.completions.runTools(
    {
      model: "gpt-3.5-turbo-1106",
      messages,
      tools,
    }
  ).on('message', (message) => console.log(message))

  const finalContent = await runner.finalContent()
  console.log(finalContent)

}

await agent("What is my local weather?")


