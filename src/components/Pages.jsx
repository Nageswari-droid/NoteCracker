import React, { useEffect, useState } from "react";
import useSession from "../hooks/useSession";

export default function Pages() {
  const session = useSession();
  const { data: sessionData } = session;

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:54321/functions/v1/notion_pages",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${sessionData.accessToken}`,
            },
            body: JSON.stringify({
              name: "Functions",
              providerToken: sessionData.providerToken,
            }),
          }
        );

        if (!response.ok) {
          const data = await response.json();
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Pages</h1>
    </div>
  );
}
