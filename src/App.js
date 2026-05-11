import { useState } from "react";

const API_KEY = "9c69292a1d6aea0733c4a0bd05995221";

export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const getWeather = async () => {
    if (!city) return;
    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();

      if (data.cod !== 200) {
        setError("City not found! Please try again.");
      } else {
        setWeather(data);
      }
    } catch (err) {
      setError("Something went wrong. Check your internet.");
    }

    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") getWeather();
  };

  const getBackground = () => {
    if (!weather) return "from-blue-400 to-indigo-600";
    const main = weather.weather[0].main.toLowerCase();
    if (main.includes("cloud")) return "from-gray-400 to-gray-600";
    if (main.includes("rain")) return "from-blue-600 to-blue-900";
    if (main.includes("snow")) return "from-blue-100 to-blue-300";
    if (main.includes("thunder")) return "from-gray-700 to-gray-900";
    if (main.includes("clear")) return "from-yellow-300 to-orange-400";
    return "from-blue-400 to-indigo-600";
  };

  const getWeatherIcon = () => {
    if (!weather) return "🌍";
    const main = weather.weather[0].main.toLowerCase();
    if (main.includes("cloud")) return "☁️";
    if (main.includes("rain")) return "🌧️";
    if (main.includes("snow")) return "❄️";
    if (main.includes("thunder")) return "⛈️";
    if (main.includes("clear")) return "☀️";
    if (main.includes("mist") || main.includes("fog")) return "🌫️";
    return "🌤️";
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${getBackground()} flex items-center justify-center p-4 transition-all duration-700`}>
      <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-3xl shadow-2xl p-8 w-full max-w-md text-white">

        {/* Title */}
        <h1 className="text-4xl font-bold text-center mb-2">🌤️ WeatherApp</h1>
        <p className="text-center text-white text-opacity-80 mb-6">Search any city in the world</p>

        {/* Search Bar */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Enter city name..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 px-4 py-3 rounded-xl bg-white bg-opacity-30 placeholder-white placeholder-opacity-70 text-white outline-none focus:ring-2 focus:ring-white"
          />
          <button
            onClick={getWeather}
            className="px-5 py-3 bg-white text-indigo-600 font-bold rounded-xl hover:bg-opacity-90 transition"
          >
            Search
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center text-2xl animate-pulse">
            ⏳ Fetching weather...
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-center bg-red-500 bg-opacity-40 rounded-xl p-4">
            ❌ {error}
          </div>
        )}

        {/* Weather Card */}
        {weather && (
          <div className="text-center">
            {/* City Name */}
            <h2 className="text-3xl font-bold">{weather.name}, {weather.sys.country}</h2>
            <p className="text-white text-opacity-70 mb-4">{weather.weather[0].description}</p>

            {/* Icon */}
            <div className="text-8xl mb-4">{getWeatherIcon()}</div>

            {/* Temperature */}
            <div className="text-7xl font-bold mb-6">
              {Math.round(weather.main.temp)}°C
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white bg-opacity-20 rounded-2xl p-3">
                <p className="text-sm opacity-70">Feels Like</p>
                <p className="text-xl font-bold">{Math.round(weather.main.feels_like)}°C</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-2xl p-3">
                <p className="text-sm opacity-70">Humidity</p>
                <p className="text-xl font-bold">{weather.main.humidity}%</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-2xl p-3">
                <p className="text-sm opacity-70">Wind</p>
                <p className="text-xl font-bold">{weather.wind.speed} m/s</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-2xl p-3">
                <p className="text-sm opacity-70">Min Temp</p>
                <p className="text-xl font-bold">{Math.round(weather.main.temp_min)}°C</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-2xl p-3">
                <p className="text-sm opacity-70">Max Temp</p>
                <p className="text-xl font-bold">{Math.round(weather.main.temp_max)}°C</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-2xl p-3">
                <p className="text-sm opacity-70">Pressure</p>
                <p className="text-xl font-bold">{weather.main.pressure} hPa</p>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <p className="text-center text-white text-opacity-50 text-sm mt-6">
          Powered by OpenWeatherMap
        </p>
      </div>
    </div>
  );
}