import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Styles
import "./Searchbar.css";

export default function Searchbar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = function (e) {
    e.preventDefault();

    navigate(`/search?query=${query}`);
    setQuery("");
  };

  return (
    <div className="searchbar">
      <form onSubmit={handleSubmit}>
        <label htmlFor="search">Search:</label>
        <input
          id="search"
          type="text"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          required
        />
      </form>
    </div>
  );
}
