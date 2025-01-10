import { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../context/contextProvider";
import Button from "./shared/Button";

export default function Result({ mcq }) {
  const { selectedAnswers, reset } = useContext(Context);
  const navigate = useNavigate();

  const [currentResultPage, setCurrentResultPage] = useState(0);

  const handleResultNext = () => {
    if (currentResultPage < totalResultsPages - 1) {
      setCurrentResultPage(currentResultPage + 1);
    } else {
      setCurrentResultPage(0);
      reset();
      navigate("/");
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
      <h2 className="text-xl font-bold mb-4">Results</h2>
      {currentResults.map(([key, question]) => (
        <div key={key} className="mb-4">
          <h3 className="font-semibold">{question.question}</h3>
          <p>Your answer: {selectedAnswers[key]}</p>
          <p
            className={`font-semibold ${
              selectedAnswers[key] === question.answer
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            Correct answer: {question.answer}
          </p>
          <p className="text-sm text-gray-600">{question.explanation}</p>
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
