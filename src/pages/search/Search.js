import { useLocation } from "react-router-dom";
import { projectFirestore } from "../../firebase/config.js";
import { useEffect, useState } from "react";

// styles
import "./Search.css";

// Components
import RecipeList from "../../components/RecipeList.js";

export default function Search() {
  // ?query=${query}
  const queryString = useLocation().search;
  const queryParams = new URLSearchParams(queryString);
  const query = queryParams.get("query");

  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsPending(true);
    setData(null);
    const unsub = projectFirestore
      .collection("recipes")
      .where("title", ">=", query)
      .where("title", "<=", query + "~")
      .onSnapshot(
        (snapshot) => {
          let results = [];
          snapshot.docs.forEach((doc) =>
            results.push({ id: doc.id, ...doc.data() })
          );
          setIsPending(false);
          setData(results);
        },
        (err) => {
          setIsPending(false);
          setError(err.message);
        }
      );
    return () => unsub();
  }, [query]);

  return (
    <div>
      <h2 className="page-title">Recipes Including "{query}"</h2>
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {data && <RecipeList recipes={data} />}
    </div>
  );
}
