export async function getCurrentWeather() {
    const weather = {
        temperature: "72",
        unit: "F",
        forecast: "Sunny"
    }
    return JSON.stringify(weather)

}

export async function getLocation() {
    return "Kennesaw, GA"
}