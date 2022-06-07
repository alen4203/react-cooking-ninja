// Styles
import "./RecipeList.css";
import Delete from "../assets/delete.svg";

import { Link } from "react-router-dom";
import { useTheme } from "../hooks/useTheme.js";
import { projectFirestore } from "../firebase/config.js";

export default function RecipeList({ recipes }) {
  const { mode } = useTheme();
  if (recipes.length === 0)
    return <div className="error">No Recipes to Load...</div>;

  const handleDelete = function (id) {
    projectFirestore.collection("recipes").doc(id).delete();
  };

  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <div className={`card ${mode}`} key={recipe.id}>
          <h3>{recipe.title}</h3>
          <p>{recipe.cookingTime} to make.</p>
          <div>{recipe.method.substring(0, 100)}...</div>
          <Link to={`/recipes/${recipe.id}`}>Cook This!</Link>
          <img
            className="delete"
            src={Delete}
            onClick={() => handleDelete(recipe.id)}
          />
        </div>
      ))}
    </div>
  );
}
