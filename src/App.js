import { BrowserRouter, Routes, Route } from "react-router-dom";

// Page components
import Create from "./pages/create/Create.js";
import Home from "./pages/home/Home.js";
import Recipe from "./pages/recipe/Recipe.js";
import Search from "./pages/search/Search.js";

// Other components
import Navbar from "./components/Navbar.js";
import ThemeSelector from "./components/ThemeSelector.js";

// Hooks
import { useTheme } from "./hooks/useTheme.js";

// styles
import "./App.css";

function App() {
  const { mode } = useTheme();
  return (
    <div className={`App ${mode}`}>
      <BrowserRouter>
        <Navbar />
        <ThemeSelector />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="create" element={<Create />}></Route>
          <Route path="search" element={<Search />}></Route>
          <Route path="recipes/:id" element={<Recipe />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
