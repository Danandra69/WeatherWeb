export default function About() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">About This Web</h1>
      <p className="text-lg mb-4">
        Weather Web adalah Website sederhana untuk menampilkan data cuaca
        menggunakan API dari{" "}
        <a
          href="https://www.weatherapi.com/"
          target="_blank"
          rel="noreferrer"
          className="text-blue-600 underline"
        >
          WeatherAPI
        </a>
        .
      </p>
      <p className="text-lg mb-4">
        Fitur utama:
        <ul className="list-disc list-inside mt-2">
          <li>Menampilkan cuaca di 8 kota populer</li>
          <li>Pencarian cuaca berdasarkan kota / negara</li>
          <li>Detail cuaca + 3 hari forecast</li>
          <li>Pesan error jika kota tidak ditemukan</li>
          <li>Loading state saat mencari & membuka detail</li>
        </ul>
      </p>
    </div>
  );
}
