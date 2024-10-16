import './style.css'
import OpenAI from 'openai'
import { getCurrentWeather, getLocation } from './tools'

export const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
})

const weather = await getCurrentWeather()
const location = await getLocation()

const response = await openai.chat.completions.create({
  model: "gpt-4o",
  messages: [
    {
      role: "user",
      content: `Give me a list of activity ideas based on my current location of ${location} and weather of ${weather}.`
    }
  ]
})

const chatgpt = response.choices[0].message.content

document.getElementById("text-box").textContent = chatgpt

console.log(chatgpt)
