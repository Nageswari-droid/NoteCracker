import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Context } from "./context/contextProvider";
import { useState } from "react";
import Router from "./router";
import "./App.css";

function App() {
  const queryClient = new QueryClient();
  const [pages, setPages] = useState([]);

  return (
    <QueryClientProvider client={queryClient}>
      <Context.Provider value={{ pages, setPages }}>
        <Router />
      </Context.Provider>
    </QueryClientProvider>
  );
}

export default App;
