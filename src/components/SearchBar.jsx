import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query); // Ke Home Kalau Kosong
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center mb-6 gap-2">
      <input
        type="text"
        placeholder="Cari Kota Atau Negara..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="px-4 py-2 border rounded-lg w-64 shadow-sm"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Cari
      </button>
    </form>
  );
}
