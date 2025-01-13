import { useState } from "react";
import Result from "./Result";
import Quiz from "./Quiz";

export default function Revise({ mcq, setMcq }) {
  const [showResults, setShowResults] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(1);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const reset = () => {
    setCurrentQuestionIndex(1);
    setSelectedAnswers(null);
    setShowResults(false);
    setMcq(null);
  };

  return (
    <>
      {mcq && (
        <div className="bg-[#1a1a19] w-full h-full flex">
          <div className="xl:w-1/2 lg:w-2/3 w-3/4 border-0 m-auto rounded-md bg-slate-100 p-6">
            {showResults ? (
              <Result
                mcq={mcq}
                reset={reset}
                selectedAnswers={selectedAnswers}
              />
            ) : (
              <Quiz
                mcq={mcq}
                setShowResults={setShowResults}
                currentQuestionIndex={currentQuestionIndex}
                setCurrentQuestionIndex={setCurrentQuestionIndex}
                selectedAnswers={selectedAnswers}
                setSelectedAnswers={setSelectedAnswers}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}
