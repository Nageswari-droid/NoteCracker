import { useContext } from "react";
import LogoutBar from "./LogoutBar";
import { Context } from "../context/contextProvider";
import Result from "./Result";
import Quiz from "./Quiz";

export default function Revise() {
  const { notes, showResults } = useContext(Context);
  const mcq = {
    1: {
      question: "What is the capital of France?",
      options: ["Paris", "London", "Berlin", "Madrid"],
      answer: "Paris",
      explanation:
        "Paris is the capital of France because it is a beautiful city and has a lot of history.",
    },
    2: {
      question: "What is the capital of India?",
      options: ["Delhi", "London", "Berlin", "Madrid"],
      answer: "Delhi",
      explanation:
        "Delhi is the capital of India because it is a beautiful city and has a lot of history.",
    },
    3: {
      question: "What is the capital of USA?",
      options: ["Paris", "Washington DC", "Berlin", "Madrid"],
      answer: "Washington DC",
      explanation:
        "Washington DC is the capital of USA because it is a beautiful city and has a lot of history.",
    },
    4: {
      question: "What is the capital of Japan?",
      options: ["Tokyo", "Beijing", "Seoul", "Bangkok"],
      answer: "Tokyo",
      explanation:
        "Tokyo is the capital of Japan because it is a beautiful city and has a lot of history.",
    },
    5: {
      question: "What is the capital of Australia?",
      options: ["Sydney", "Canberra", "Melbourne", "Brisbane"],
      answer: "Canberra",
      explanation:
        "Canberra is the capital of Australia because it is a beautiful city and has a lot of history.",
    },
  };

  return (
    <div className="bg-[#1a1a19] w-full h-full">
      <LogoutBar />
      {notes.length > 0 && (
        <div className="bg-[#1a1a19] w-full h-full flex">
          <div className="xl:w-1/2 lg:w-2/3 w-3/4 border-0 m-auto rounded-md bg-slate-100 p-6">
            {showResults ? <Result mcq={mcq} /> : <Quiz mcq={mcq} />}
          </div>
        </div>
      )}
    </div>
  );
}
