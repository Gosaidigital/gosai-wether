
import { GoogleGenAI, Type } from "@google/genai";
import type { WeatherData } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const weatherSchema = {
  type: Type.OBJECT,
  properties: {
    current: {
      type: Type.OBJECT,
      description: "Data for the current weather conditions.",
      properties: {
        locationName: { type: Type.STRING, description: "The full name of the location, e.g., 'Tokyo, Japan'." },
        temperatureC: { type: Type.NUMBER, description: "Current temperature in Celsius." },
        temperatureF: { type: Type.NUMBER, description: "Current temperature in Fahrenheit." },
        condition: { type: Type.STRING, description: "A brief weather condition description, e.g., 'Partly cloudy'." },
        windKph: { type: Type.NUMBER, description: "Wind speed in kilometers per hour." },
        humidity: { type: Type.NUMBER, description: "Humidity percentage as a whole number, e.g., 75." },
        isDay: { type: Type.INTEGER, description: "1 if it is currently daytime at the location, 0 if it is nighttime." },
      },
      required: ["locationName", "temperatureC", "temperatureF", "condition", "windKph", "humidity", "isDay"],
    },
    forecast: {
      type: Type.ARRAY,
      description: "An array of weather forecasts for the next 5 days.",
      items: {
        type: Type.OBJECT,
        properties: {
          date: { type: Type.STRING, description: "The date of the forecast in YYYY-MM-DD format." },
          dayOfWeek: { type: Type.STRING, description: "The day of the week, e.g., 'Tuesday'." },
          maxTempC: { type: Type.NUMBER, description: "Forecasted maximum temperature in Celsius." },
          maxTempF: { type: Type.NUMBER, description: "Forecasted maximum temperature in Fahrenheit." },
          minTempC: { type: Type.NUMBER, description: "Forecasted minimum temperature in Celsius." },
          minTempF: { type: Type.NUMBER, description: "Forecasted minimum temperature in Fahrenheit." },
          condition: { type: Type.STRING, description: "The general weather condition for the day, e.g., 'Sunny'." },
        },
        required: ["date", "dayOfWeek", "maxTempC", "maxTempF", "minTempC", "minTempF", "condition"],
      },
    },
  },
  required: ["current", "forecast"],
};

export const fetchWeatherData = async (location: string): Promise<WeatherData> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Provide the current weather and a 5-day forecast for ${location}. Use today for the first forecast day.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: weatherSchema,
      },
    });

    const text = response.text.trim();
    if (!text) {
        throw new Error("The model returned an empty response. The location may be invalid.");
    }

    try {
        const data: WeatherData = JSON.parse(text);
        if (!data.current || !data.forecast || data.forecast.length === 0) {
            throw new Error("Received incomplete weather data from the model.");
        }
        return data;
    } catch (parseError) {
        console.error("Failed to parse JSON response:", text);
        throw new Error("Could not understand the weather data from the model. Please try a different location.");
    }

  } catch (error) {
    console.error("Error fetching weather data from Gemini API:", error);
    if (error instanceof Error && error.message.includes('API_KEY')) {
        throw new Error("API key is invalid or not configured correctly.");
    }
    throw new Error("Could not fetch weather data. Please check the location and try again.");
  }
};
