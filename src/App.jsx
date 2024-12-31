import "./App.css";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Router from "./router";
import { Context } from "./context/contextProvider";
import { useState } from "react";

function App() {
  const queryClient = new QueryClient();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <Context.Provider
        value={{
          isLoggedIn,
          setIsLoggedIn,
        }}
      >
        <Router />
      </Context.Provider>
    </QueryClientProvider>
  );
}

export default App;
