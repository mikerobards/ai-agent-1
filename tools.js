export async function getCurrentWeather() {
    const weather = {
        temperature: "2",
        unit: "F",
        forecast: "Snowy"
    }
    return JSON.stringify(weather)

}

export async function getLocation() {
    return "Kennesaw, GA"
}