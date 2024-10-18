export async function getCurrentWeather({ location }) {
    // console.log("location: ", location)
    const response = await fetch(`https://api.weather.gov/points/${latitude},${longitude}`)
    const text = await response.json()

    const weather = {
        location,
        text
    }
    return JSON.stringify(weather)

}


export async function getLocation() {
    try {
        const response = await fetch('https://ipapi.co/json/')
        const text = await response.json()
        console.log(text)
        return JSON.stringify(text)
    } catch (err) {
        console.log(err)
    }
}

export const tools = [
    {
        type: "function",
        function: {
            function: getCurrentWeather,
            parameters: {
                type: "object",
                properties: {
                    location: {
                        type: "string",
                        description: "The location from where to get the weather"
                    }
                },
                required: ["location"]
            }
        }
    },
    {
        type: "function",
        function: {
            function: getLocation,
            parameters: {
                type: "object",
                properties: {
                    latitude: { type: "number" },
                    longitude: { type: "number" }
                }
            }
        }
    },
]

