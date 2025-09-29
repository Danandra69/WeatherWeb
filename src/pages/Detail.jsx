import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Detail() {
  const { city } = useParams();
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const API_KEY = "25923da747e544f5bfc104551252209";

  const fetchDetail = async () => {
    try {
      setLoading(true);
      setErrorMsg("");
      const res = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=3&aqi=no&alerts=no`
      );
      const data = await res.json();
      if (data.error) {
        setErrorMsg("Kota / Negara Tidak Ditemukan");
      } else {
        setDetail(data);
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Ada Yang Tidak Beres...");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetail();
  }, [city]);

  return (
    <div className="container mx-auto p-4">
      <Link to="/" className="text-blue-700 underline">
        ← Kembali
      </Link>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-lg font-semibold">Loading...</p>
        </div>
      ) : errorMsg ? (
        <p className="text-center text-red-600 mt-4 font-semibold">
          {errorMsg}
        </p>
      ) : detail && detail.location ? (
        <div className="bg-white rounded-lg shadow-md p-6 mt-4">
          <h2 className="text-2xl font-bold mb-2">
            {detail.location.name}, {detail.location.country}
          </h2>
          <p className="text-lg">Saat Ini : {detail.current.condition.text}</p>
          <p className="text-lg">
            Temperature : {detail.current.temp_c}°C / {detail.current.temp_f}°F
          </p>
          <h3 className="text-xl font-semibold mt-4 mb-2">Ramalan Cuaca 3 Hari :</h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {detail.forecast.forecastday.map((day) => (
              <div
                key={day.date}
                className="bg-blue-50 p-4 rounded-lg shadow-sm"
              >
                <p className="font-bold">{day.date}</p>
                <img
                  src={day.day.condition.icon}
                  alt={day.day.condition.text}
                  className="w-12 h-12"
                />
                <p>{day.day.condition.text}</p>
                <p>Max: {day.day.maxtemp_c}°C</p>
                <p>Min: {day.day.mintemp_c}°C</p>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
