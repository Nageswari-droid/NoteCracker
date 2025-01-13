import { useState } from "react";
import Button from "./shared/Button";
import {
  results,
  correctAnswer,
  yourAnswer,
  explanation,
} from "../constants/text";

export default function Result({ mcq, reset, selectedAnswers }) {
  const [currentResultPage, setCurrentResultPage] = useState(0);

  const handleResultNext = () => {
    if (currentResultPage < totalResultsPages - 1) {
      setCurrentResultPage(currentResultPage + 1);
    } else {
      setCurrentResultPage(0);
      reset();
    }
  };

  const handleResultPrevious = () => {
    setCurrentResultPage(currentResultPage - 1);
  };

  const resultsPerPage = 3;
  const totalResultsPages = Math.ceil(Object.keys(mcq).length / resultsPerPage);
  const currentResults = Object.entries(mcq).slice(
    currentResultPage * resultsPerPage,
    (currentResultPage + 1) * resultsPerPage
  );

  return (
    <div className="results">
      <h2 className="text-xl font-bold mb-4">{results}</h2>
      {currentResults.map(([key, question]) => (
        <div key={key} className="mb-4">
          <h3 className="font-semibold">{question.question}</h3>
          <p>
            {yourAnswer} {selectedAnswers[key]}
          </p>
          <p
            className={`font-semibold ${
              selectedAnswers[key] === question.answer
                ? "text-[#539e75]"
                : "text-[#a70000]"
            }`}
          >
            {correctAnswer} {question.answer}
          </p>
          <p className="text-sm text-slate-700">
            <span className="text-base text-slate-900 font-semibold">
              {explanation}
            </span>
            {question.explanation}
          </p>
        </div>
      ))}
      <div className="navigation-buttons mt-6 flex justify-between">
        <Button
          text={"Previous"}
          isDisabled={currentResultPage === 0}
          clickHandler={handleResultPrevious}
        />
        <Button
          text={
            currentResultPage === totalResultsPages - 1 ? "Revise more" : "Next"
          }
          isDisabled={false}
          clickHandler={handleResultNext}
        />
      </div>
    </div>
  );
}
