import { Link } from "react-router-dom";
import { useTheme } from "../hooks/useTheme.js";

// styles
import "./Navbar.css";

// Components
import Searchbar from "./Searchbar.js";

export default function Navbar() {
  const { color } = useTheme();

  return (
    <div className="navbar" style={{ background: color }}>
      <nav>
        <Link to="/" className="brand">
          <h1>Cooking Ninja</h1>
        </Link>
        <Searchbar />
        <Link to="create">Create Recipe</Link>
      </nav>
    </div>
  );
}
