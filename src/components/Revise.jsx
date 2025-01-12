import { useContext, useEffect, useState } from "react";
import { Context } from "../context/contextProvider";
import Result from "./Result";
import Quiz from "./Quiz";
import useLLM from "../hooks/useLLM";
import prompt from "../constants/prompt";
import Loader from "../Loader";
import useSession from "../hooks/useSession";

export default function Revise() {
  const {
    showResults,
    notes,
    selectedNumberOfQuestions,
    selectedQuestionDifficulty,
  } = useContext(Context);
  const [mcq, setMcq] = useState(null);
  const session = useSession();
  const { data: sessionData } = session;
  let context =
    prompt +
    `\nthe number of questions: ${selectedNumberOfQuestions} \n` +
    `\ncomplexity level: ${selectedQuestionDifficulty} \n` +
    "\nNotes:\n" +
    notes;

  const { data, isLoading, error } = useLLM(sessionData?.accessToken, context);

  useEffect(() => {
    if (data) {
      const content = data?.content;
      setMcq(JSON.parse(content));
    }
  }, [data]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="bg-[#1a1a19] w-full h-full flex">
      <div className="xl:w-1/2 lg:w-2/3 w-3/4 border-0 m-auto rounded-md bg-slate-100 p-6">
        {mcq ? showResults ? <Result mcq={mcq} /> : <Quiz mcq={mcq} /> : <></>}
      </div>
    </div>
  );
}
