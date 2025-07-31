import { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");

  const baseURL = import.meta.env.VITE_API_KEY;

  const getWeatherIcon = (weatherMain) => {
    switch (weatherMain.toLowerCase()) {
      case "clear":
        return "/icons/clear.png";
      case "clouds":
        return "/icons/cloudy.png";
      case "rain":
        return "/icons/rain.png";
      default:
        return "/icons/default.png";
    }
  };


  const getWeather = async () => {
    if (!city) return setError("Please enter a city name.");
    try {
      const res = await fetch(`${baseURL}/api/weather?city=${city}`);
      const data = await res.json();
      if (data.cod === 404) {
        setError("City not found");
        setWeatherData(null);
      } else {
        setWeatherData(data);
        setError("");
      }
    } catch (error) {
      console.error("Error fetching weather:", error);
      setError("Failed to fetch weather data");
    }
  };

  return (
    <div className="bg-blue-950 text-white flex items-center justify-center h-screen px-4">
      <div className="bg-blue-800 p-8 rounded-xl shadow-xl w-full max-w-md text-center space-y-4 relative">
        <h1 className="text-3xl font-bold text-green-400">Weather App</h1>

        <div className="flex gap-2 justify-center relative w-full">
          <div className="w-full relative">
            <input
              className="border-gray-300 rounded px-4 py-2 w-full text-white border-2 bg-transparent mt-1"
              type="text"
              placeholder="Enter city name"
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
              }}
              onFocus={() => {
                if (suggestions.length > 0) setShowSuggestions(true);
              }}
            />
          </div>

          <button
            className="bg-red-600 hover:bg-red-700 text-white px-4 rounded-lg border-2"
            onClick={getWeather}
          >
            Get Weather
          </button>
        </div>

        {error && <p className="text-red-400 font-semibold">{error}</p>}

        {weatherData && weatherData.sys && (
          <div className="mt-4 space-y-2">
            <img
              src={getWeatherIcon(weatherData.weather[0].main)}
              alt="Weather icon"
              className="mx-auto w-24 h-24"
            />
            <h2 className="text-xl font-semibold">
              {weatherData.name}, {weatherData.sys.country}
            </h2>
            <p className="capitalize">{weatherData.weather[0].description}</p>
            <p className="text-lg font-medium">
              Temperature: {weatherData.main.temp}°C
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
