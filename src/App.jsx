import "./App.css";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Router from "./router";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
}

export default App;
