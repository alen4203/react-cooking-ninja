import { projectFirestore } from "../../firebase/config.js";
import { useParams } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme.js";
import { useEffect, useState } from "react";

// styles
import "./Recipe.css";

export default function Recipe() {
  const { mode } = useTheme();
  const { id } = useParams();

  const [recipe, setRecipe] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsPending(true);
    const unsub = projectFirestore
      .collection("recipes")
      .doc(id)
      .onSnapshot((doc) => {
        if (!doc.exists) {
          setIsPending(false);
          setError("Could not find that recipe...");
        } else {
          setIsPending(false);
          setRecipe(doc.data());
        }
      });
    return () => unsub();
  }, [id]);

  const handleClick = function () {
    projectFirestore.collection("recipes").doc(id).update({
      title: "Something totally different",
    });
  };

  return (
    <div className={`recipe ${mode}`}>
      {isPending && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}
      {recipe && (
        <>
          <h2 className="page-title">{recipe.title}</h2>
          <p>Takes {recipe.cookingTime} to cook.</p>
          <ul>
            {recipe.ingredients.map((ing) => (
              <li key={ing}>{ing}</li>
            ))}
          </ul>
          <p className="method">{recipe.method}</p>
        </>
      )}
      <button onClick={handleClick}>Update Me</button>
    </div>
  );
}
