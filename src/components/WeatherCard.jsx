import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function WeatherCard({ weather }) {
  const navigate = useNavigate();
  const [loadingDetail, setLoadingDetail] = useState(false);

  const handleDetail = () => {
    setLoadingDetail(true);
    setTimeout(() => {
      navigate(`/detail/${weather.location.name}`);
    }, 1000); // delay
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 text-center hover:shadow-lg transition">
      <h2 className="text-lg font-bold mb-2">
        {weather.location.name}, {weather.location.country}
      </h2>
      <img
        src={weather.current.condition.icon}
        alt={weather.current.condition.text}
        className="mx-auto w-16 h-16"
      />
      <p className="text-md">{weather.current.condition.text}</p>
      <p className="text-xl font-semibold">{weather.current.temp_c}°C</p>

      {loadingDetail ? (
        <p className="mt-3 text-blue-600 font-semibold">Loading...</p>
      ) : (
        <button
          onClick={handleDetail}
          className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 shadow-sm"
        >
          Lihat Detail
        </button>
      )}
    </div>
  );
}
