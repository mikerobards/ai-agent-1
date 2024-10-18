// export async function getCurrentWeather({ latitude, longitude }) {

//     // do lookup
//     const gridResponse = await fetch(`https://api.weather.gov/points/${latitude},${longitude}`);
//     const gridData = await gridResponse.json();
//     console.log("gridData: ", gridData)
//     return { gridData }
//     // return { temperature, precipitation }
// }

export async function getCurrentWeather({ latitude, longitude, city, region }) {
    console.log({ latitude, longitude })
    try {
        // Fetch grid data
        const gridResponse = await fetch(`https://api.weather.gov/points/${latitude},${longitude}`);
        const gridData = await gridResponse.json();
        console.log("gridData: ", gridData);

        // Check if the response contains the forecast URL
        if (gridData.properties && gridData.properties.forecast) {
            const forecastUrl = gridData.properties.forecast;

            // Fetch the forecast data
            const forecastResponse = await fetch(forecastUrl);
            const forecastData = await forecastResponse.json();
            console.log("forecastData: ", forecastData);

            // Extract useful weather information from forecast data
            const currentWeather = forecastData.properties.periods[0]; // The first period is usually the current weather
            return {
                temperature: currentWeather.temperature,
                precipitation: currentWeather.shortForecast,
                city: gridData.properties.relativeLocation.properties.city,
                state: gridData.properties.relativeLocation.properties.state
            };
        } else {
            console.error("Unable to fetch forecast data");
            return null;
        }
    } catch (err) {
        console.error("Error fetching weather data: ", err);
        return null;
    }
}

export async function getLocation() {
    try {
        const response = await fetch('https://ipapi.co/json/');
        const locationData = await response.json();
        console.log("Full location data:", locationData);  // Log the full response for debugging

        // Extract latitude and longitude from location data
        const { latitude, longitude, city, region } = locationData;


        if (!latitude || !longitude) {
            throw new Error("Could not retrieve latitude or longitude from the location data.");
        }
        console.log(city, region)
        console.log("Latitude:", latitude);
        console.log("Longitude:", longitude);

        return {
            latitude,
            longitude
        };
    } catch (err) {
        console.error("Error fetching location data:", err);
        return null;
    }
}

export const tools = [
    {
        type: 'function',
        function: {
            function: getLocation,
            parameters: { type: 'object', properties: {} },
        },
    },
    {
        type: 'function',
        function: {
            function: getCurrentWeather,
            parse: JSON.parse,
            parameters: {
                type: 'object',
                properties: {
                    latitude: { type: 'number' },
                    longitude: { type: 'number' },
                },
                required: ['latitude', 'longitude'],
            },
        },
    }
];


