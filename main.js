import './style.css'
import OpenAI from 'openai'
import { getCurrentWeather, getLocation } from './tools'

export const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
})

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

const systemPrompt = `
You cycle through Thought, Action, PAUSE, Observation. At the end of the loop you output a final Answer. 
Your final answer should be highly specific to the observations you have from running
the actions.
1. Thought: Describe your thoughts about the question you have been asked.
2. Action: run one of the actions available to you - then return PAUSE.
3. PAUSE
4. Observation: will be the result of running those actions.

Available actions:
- getCurrentWeather: 
    E.g. getCurrentWeather: Salt Lake City
    Returns the current weather of the location specified.
- getLocation:
    E.g. getLocation: null
    Returns user's location details. No arguments needed.

Example session:
Question: Please give me some ideas for activities to do this afternoon.
Thought: I should look up the user's location so I can give location-specific activity ideas.
Action: getLocation: null
PAUSE

You will be called again with something like this:
Observation: "New York City, NY"

Then you loop again:
Thought: To get even more specific activity ideas, I should get the current weather at the user's location.
Action: getCurrentWeather: New York City
PAUSE

You'll then be called again with something like this:
Observation: { location: "New York City, NY", forecast: ["sunny"] }

You then output:
Answer: <Suggested activities based on sunny weather that are highly specific to New York City and surrounding areas.>
`



// const response = await openai.chat.completions.create({
//   model: "gpt-3.5-turbo",
//   messages: [
//     {
//       role: "user",
//       content: `Give me a list of activity ideas based on my current location of ${location} and weather of ${weather}.`
//     }
//   ]
// })

const chatgpt = response.choices[0].message.content

document.getElementById("text-box").textContent = chatgpt

console.log(chatgpt)
