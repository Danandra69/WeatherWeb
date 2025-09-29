import { Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import About from "./pages/About";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-blue-600 p-4 text-white flex justify-between items-center relative">
        {/* Brand */}
        <Link to="/" className="text-xl font-bold">
          Weather Web
        </Link>

        {/* Menu (Desktop) */}
        <div className="hidden md:flex flex-1 justify-center gap-8 text-lg">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/about" className="hover:underline">
            About
          </Link>
        </div>

        {/* Hamburger (Mobile) */}
        <button
          className="md:hidden flex flex-col gap-1"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="w-6 h-0.5 bg-white"></span>
          <span className="w-6 h-0.5 bg-white"></span>
          <span className="w-6 h-0.5 bg-white"></span>
        </button>

        {/* Dropdown Mobile */}
        {isOpen && (
          <div className="absolute top-full left-0 w-full bg-blue-600 flex flex-col items-center gap-4 py-4 md:hidden">
            <Link
              to="/"
              className="hover:underline"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="hover:underline"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
          </div>
        )}
      </nav>

      {/* Routing */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:city" element={<Detail />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}
