import { useState, useEffect } from "react";

export const useFetch = function (url, method = "GET") {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState(null);

  const postData = function (postData) {
    setOptions({
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postData),
    });
  };

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async (options) => {
      try {
        setIsPending(true);
        const res = await fetch(url, { ...options, signal: controller.signal });
        if (!res.ok) throw new Error(`Cannot get data, status: ${res.status}`);
        const json = await res.json();

        setIsPending(false);
        setData(json);
        setError(null);
      } catch (err) {
        if (err.name === "AbortError") console.log("Request Aborted...");
        else {
          setIsPending(false);
          setError(err.message);
          console.error(err);
        }
      }
    };

    if (method === "GET") fetchData();
    if (method === "POST" && options) fetchData(options);

    return () => {
      controller.abort();
    };
  }, [url, method, options]);

  return { data, isPending, error, postData };
};
