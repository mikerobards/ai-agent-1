const MAX_ITERATIONS = 5

for (let i = 0; i < MAX_ITERATIONS; i++) {
    console.log(`Iteration #:${i + 1}`)
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo-1106",
        messages,
        tools
    })
    const { finish_reason: finishReason, message } = response.choices[0]
    const { tool_calls: toolCalls } = message
    console.log(toolCalls)

    messages.push(message)

    if (finishReason === "stop") {
        console.log(message.content)
        console.log("AGENT ENDING")
        return
    } else if (finishReason === "tool_calls") {
        for (const toolCall of toolCalls) {
            const functionName = toolCall.function.name
            const functionToCall = availableFunctions[functionName]
            const functionArgs = JSON.parse(toolCall.function.arguments)
            // console.log(functionArgs)
            const functionResponse = await functionToCall(functionArgs)
            console.log(functionResponse)
            messages.push({
                tool_call_id: toolCall.id,
                role: "tool",
                name: functionName,
                content: functionResponse
            })
        }

    }
}