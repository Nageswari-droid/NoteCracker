import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Context } from "./context/contextProvider";
import { useState } from "react";
import Router from "./router";
import "./App.css";

function App() {
  const queryClient = new QueryClient();
  const [pages, setPages] = useState([]);
  const [workspace, setWorkspace] = useState([]);
  const [allPages, setAllPages] = useState([]);
  const [mcq, setMcq] = useState(null);

  return (
    <QueryClientProvider client={queryClient}>
      <Context.Provider
        value={{
          pages,
          setPages,
          workspace,
          setWorkspace,
          allPages,
          setAllPages,
          mcq,
          setMcq,
        }}
      >
        <Router />
      </Context.Provider>
    </QueryClientProvider>
  );
}

export default App;
