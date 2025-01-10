import { useContext } from "react";
import { Context } from "../context/contextProvider";
import Button from "./shared/Button";

export default function Quiz({ mcq }) {
  const {
    currentQuestionIndex,
    setCurrentQuestionIndex,
    setShowResults,
    selectedAnswers,
    setSelectedAnswers,
  } = useContext(Context);

  const handleOptionSelect = (option) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestionIndex]: option,
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < Object.keys(mcq).length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 1) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const currentQuestion = mcq[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === Object.keys(mcq).length;
  const isOptionSelected = selectedAnswers[currentQuestionIndex] !== undefined;

  return (
    <div className="question">
      <h2 className="text-xl font-semibold mb-4">{currentQuestion.question}</h2>
      <div className="options grid grid-cols-1 gap-4">
        {currentQuestion.options.map((option, index) => (
          <div
            key={index}
            className={`option-card p-4 border rounded-md cursor-pointer transition-colors ${
              selectedAnswers[currentQuestionIndex] === option
                ? "bg-slate-950 text-white"
                : "bg-white text-black hover:bg-gray-200"
            }`}
            onClick={() => handleOptionSelect(option)}
          >
            {option}
          </div>
        ))}
      </div>
      <div className="navigation-buttons mt-6 flex justify-between">
        <Button
          text={"Previous"}
          isDisabled={currentQuestionIndex === 1}
          clickHandler={handlePrevious}
        />
        <Button
          text={isLastQuestion ? "Submit" : "Next"}
          isDisabled={!isOptionSelected}
          clickHandler={handleNext}
        />
      </div>
    </div>
  );
}
