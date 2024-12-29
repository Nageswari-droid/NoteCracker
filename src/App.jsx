import "./App.css";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Router from "./router";
import { Context } from "./context/contextProvider";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Context.Provider value={{}}>
        <Router />
      </Context.Provider>
    </QueryClientProvider>
  );
}

export default App;
