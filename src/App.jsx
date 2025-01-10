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
  const [selectedNumberOfQuestions, setSelectedNumberOfQuestions] =
    useState(10);
  const [selectedQuestionDifficulty, setSelectedQuestionDifficulty] =
    useState("");
  const [notes, setNotes] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(1);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const reset = () => {
    setShowResults(false);
    setCurrentQuestionIndex(1);
    setSelectedAnswers({});
    setNotes("");
  };

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
          selectedNumberOfQuestions,
          setSelectedNumberOfQuestions,
          selectedQuestionDifficulty,
          setSelectedQuestionDifficulty,
          notes,
          setNotes,
          currentQuestionIndex,
          setCurrentQuestionIndex,
          selectedAnswers,
          setSelectedAnswers,
          showResults,
          setShowResults,
          reset,
        }}
      >
        <Router />
      </Context.Provider>
    </QueryClientProvider>
  );
}

export default App;
