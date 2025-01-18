import React, { useEffect, useContext, useState } from "react";
import { Context } from "../context/contextProvider";
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
import { useNavigate } from "react-router-dom";
import Loader from "../Loader";
import useSession from "../hooks/useSession";
import Inputs from "./Inputs";
import ButtonWithImage from "./shared/ButtonWithIcon";
import revision from "../assets/revision.png";
import revisionActive from "../assets/revision_active.png";
import usePageContent from "../hooks/usePageContent";
import prompt from "../constants/prompt";
import Popup from "./Popup";

export default function Pages({ setMcq }) {
  const session = useSession();
  const { data: sessionData, isLoading: sessionLoading } = session;
  const navigate = useNavigate();
  const { pages, workspace, allPages } = useContext(Context);
  const [selectedWorkspace, setSelectedWorkspace] = useState("");
  const [selectedPage, setSelectedPage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [popupError, setPopupError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [selectedNumberOfQuestions, setSelectedNumberOfQuestions] =
    useState(10);
  const [selectedQuestionDifficulty, setSelectedQuestionDifficulty] =
    useState("");
  const [containsPages, setContainsPages] = useState(false);
  const [clicked, setClicked] = useState(false);
  const context =
    prompt +
    `\nthe number of questions: ${selectedNumberOfQuestions} \n` +
    `\ncomplexity level: ${selectedQuestionDifficulty} \n`;
  const { pageContent, error } = usePageContent(
    sessionData?.accessToken,
    sessionData?.providerToken,
    selectedPage,
    context,
    clicked
  );
  const { data, refetch } = pageContent;

  useEffect(() => {
    if (selectedWorkspace === "") {
      setSelectedQuestionDifficulty("");
      setSelectedNumberOfQuestions(10);
    }
  }, [
    selectedWorkspace,
    setSelectedQuestionDifficulty,
    setSelectedNumberOfQuestions,
  ]);

  useEffect(() => {
    if (error) {
      navigate("/error", { replace: true });
    }
  }, [error, navigate]);

  const addPopupContent = (content) => {
    setPopupError(content);
    setShowPopup(true);
  };

  useEffect(() => {
    if (data) {
      setClicked(false);
      setIsLoading(false);

      if (data.error) {
        addPopupContent(data.error);
      } else {
        const content = data.content;

        try {
          const parsedContent = JSON.parse(content);
          const invalidReason = parsedContent["invalid"];
          if (invalidReason) {
            let invalid = {
              title: "Invalid Page Content!",
              message: invalidReason,
            };
            addPopupContent(invalid);
          } else {
            setMcq(parsedContent);
            navigate("/revise");
          }
        } catch (error) {
          console.error(error);
        }
      }
    }
  }, [data]);

  const updateSelectedWorkspace = (selectedWorkspace) => {
    setClicked(false);
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
    setClicked(false);
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
    setIsLoading(true);
    refetch();
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  if (isLoading || sessionLoading) {
    return <Loader />;
  }

  return (
    <div className="bg-[#1a1a19] w-full h-full flex">
      <div className="xl:w-1/2 lg:w-2/3 md:w-3/4 sm:w-10/12 w-11/12 border-0 m-auto rounded-md bg-slate-100 p-6">
        <Inputs
          subHead={workspacesTitle}
          options={workspace}
          updateHandler={updateSelectedWorkspace}
          defaultOption={workspaceOption}
          value={workspace[selectedWorkspace]}
          isRequired={true}
        />
        {containsPages && selectedWorkspace && (
          <Inputs
            subHead={pagesTitle}
            options={destructurePagesObj()}
            updateHandler={updateSelectedPage}
            defaultOption={pageOption}
            value={allPages[selectedPage]}
            isRequired={true}
          />
        )}
        <Inputs
          subHead={difficulty}
          options={difficultyLevel}
          updateHandler={updateQuestionDifficulty}
          defaultOption={levelOption}
          value={selectedQuestionDifficulty}
          isRequired={true}
        />
        <Inputs
          subHead={numberOfQuestionsTitle}
          updateHandler={updateNumberOfQuestions}
          count={selectedNumberOfQuestions}
          isRequired={false}
        />
        <div className="xl:w-1/5 lg:w-1/5 md:w-1/4 sm:w-1/3 max-[650px]:w-1/3 max-[550px]:w-1/2 max-[450px]:w-3/5 m-auto font-semibold">
          <ButtonWithImage
            icon={revision}
            activeIcon={revisionActive}
            label={submit}
            onClickHandler={handleClick}
            isDisabled={
              !selectedWorkspace ||
              !selectedPage ||
              !selectedQuestionDifficulty
            }
          />
        </div>
      </div>
      {showPopup && (
        <Popup
          heading={popupError.title}
          message={popupError.message}
          onClose={handleClosePopup}
        />
      )}
    </div>
  );
}
