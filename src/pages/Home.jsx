import { useEffect, useState } from "react";
import WeatherCard from "../components/WeatherCard";
import SearchBar from "../components/SearchBar";

export default function Home() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [defaultCities, setDefaultCities] = useState([]);

  const API_KEY = "25923da747e544f5bfc104551252209";

  // fetch default 8 kota
const fetchDefaultCities = async () => {
  const cities = [
    "Jakarta",
    "Bandung",
    "Tangerang",
    "Tokyo",
    "London",
    "Paris",
    "Sydney",
    "Dubai",
  ];
  try {
    const results = await Promise.all(
      cities.map(async (c) => {
        const res = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${c}&aqi=no`
        );
        return res.json();
      })
    );
    setDefaultCities(results);
  } catch (err) {
    console.error(err);
  }
};

  // fetch hasil search
const fetchWeather = async (cityName) => {
  // kalau input kosong → balik ke homepage
  if (!cityName || cityName.trim() === "") {
    setWeather(null);
    setErrorMsg("");
    fetchDefaultCities(); // panggil kota default
    return;
  }

  try {
    setLoading(true);
    setErrorMsg("");
    setWeather(null);
    const res = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${cityName}&aqi=no`
    );
    const data = await res.json();
    if (data.error) {
      setErrorMsg("Kota / Negara Tidak Ditemukan");
    } else {
      setWeather(data);
    }
  } catch (err) {
    console.error(err);
    setErrorMsg("Ada Yang Tidak Beres...");
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchDefaultCities();
  }, []);

  return (
    <div className="container mx-auto p-4">
      {/* Search */}
      <SearchBar onSearch={(val) => fetchWeather(val)} />

      {/* Loading screen */}
      {loading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
          <p className="ml-4 text-lg font-semibold">Loading...</p>
        </div>
      )}

      {/* Error message */}
      {errorMsg && !loading && (
        <p className="text-center text-red-600 font-semibold">{errorMsg}</p>
      )}

      {/* Hasil pencarian */}
      {!loading && weather && weather.location && (
        <div className="mt-6">
          <WeatherCard weather={weather} />
        </div>
      )}

      {/* Homepage  → 8 data default */}
      {!loading && !weather && !errorMsg && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-4">Kota Yang Populer</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {defaultCities.map((w, idx) => (
              <WeatherCard key={idx} weather={w} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
