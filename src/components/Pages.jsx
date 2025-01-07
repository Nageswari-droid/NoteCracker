import React, { useEffect, useContext, useState } from "react";
import { Context } from "../context/contextProvider";
import useSession from "../hooks/useSession";
import Inputs from "./Inputs";
import ButtonWithImage from "./shared/ButtonWithIcon";
import revision from "../assets/revision.png";
import revisionActive from "../assets/revision_active.png";
import usePageContent from "../hooks/usePageContent";
import {
  workspacesTitle,
  workspaceOption,
  pagesTitle,
  pageOption,
  numberOfQuestionsTitle,
  difficulty,
  levelOption,
  submit,
} from "../constants/text";
import { difficultyLevel } from "../constants/difficultyLevel";

export default function Pages() {
  const session = useSession();
  const { data: sessionData } = session;
  const { pages, workspace, allPages } = useContext(Context);
  const [selectedWorkspace, setSelectedWorkspace] = useState("");
  const [selectedPage, setSelectedPage] = useState("");
  const [containsPages, setContainsPages] = useState(false);
  const [selectedNumberOfQuestions, setSelectedNumberOfQuestions] =
    useState(10);
  const [selectedQuestionDifficulty, setSelectedQuestionDifficulty] =
    useState("");
  const [clicked, setClicked] = useState(false);

  const { data, isLoading, refetch } = usePageContent(
    sessionData?.accessToken,
    sessionData?.providerToken,
    selectedPage,
    clicked
  );

  const updateSelectedWorkspace = (selectedWorkspace) => {
    setSelectedWorkspace(selectedWorkspace);
    setSelectedPage("");
    setSelectedQuestionDifficulty("");
    setSelectedNumberOfQuestions(10);

    if (pages[selectedWorkspace].length > 1) setContainsPages(true);
    else {
      setContainsPages(false);
      setSelectedPage(selectedWorkspace);
    }
  };

  const updateSelectedPage = (selectedPage) => {
    setSelectedPage(selectedPage);
    setSelectedQuestionDifficulty("");
    setSelectedNumberOfQuestions(10);
  };

  const updateQuestionDifficulty = (selectedLevel) => {
    setSelectedQuestionDifficulty(difficultyLevel[selectedLevel]);
    setSelectedNumberOfQuestions(10);
  };

  const updateNumberOfQuestions = (numberOfQuestions) => {
    setSelectedNumberOfQuestions(numberOfQuestions);
  };

  const destructurePagesObj = () => {
    let destructuredPages = {};

    pages[selectedWorkspace].forEach((element) => {
      destructuredPages[Object.keys(element)[0]] = Object.values(element)[0];
    });

    return destructuredPages;
  };

  const handleClick = () => {
    setClicked(true);
    refetch();
  };

  return (
    <div className="bg-[#1a1a19] w-full h-full flex">
      <div className="xl:w-1/2 lg:w-2/3 w-3/4 border-0 m-auto rounded-md bg-slate-100 p-6">
        <Inputs
          subHead={workspacesTitle}
          options={workspace}
          updateHandler={updateSelectedWorkspace}
          defaultOption={workspaceOption}
          value={workspace[selectedWorkspace]}
        />
        {containsPages && selectedWorkspace && (
          <Inputs
            subHead={pagesTitle}
            options={destructurePagesObj()}
            updateHandler={updateSelectedPage}
            defaultOption={pageOption}
            value={allPages[selectedPage]}
          />
        )}
        <Inputs
          subHead={difficulty}
          options={difficultyLevel}
          updateHandler={updateQuestionDifficulty}
          defaultOption={levelOption}
          value={selectedQuestionDifficulty}
        />
        <Inputs
          subHead={numberOfQuestionsTitle}
          updateHandler={updateNumberOfQuestions}
          count={selectedNumberOfQuestions}
        />
        <div className="w-1/5 m-auto font-semibold">
          <ButtonWithImage
            icon={revision}
            activeIcon={revisionActive}
            label={submit}
            onClickHandler={handleClick}
          />
        </div>
      </div>
    </div>
  );
}
