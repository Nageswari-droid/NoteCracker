import React, { useEffect, useContext, useState } from "react";
import useSession from "../hooks/useSession";
import useListPages from "../hooks/useListPages";
import Loader from "../Loader";
import { Context } from "../context/contextProvider";
import defaultDict from "../utils/defaultDict";
import Inputs from "./Inputs";
import ButtonWithImage from "./shared/ButtonWithIcon";
import revision from "../assets/revision.png";
import revisionActive from "../assets/revision_active.png";

export default function Pages() {
  const session = useSession();
  const { pages, setPages } = useContext(Context);
  const { data: sessionData } = session;
  const listPages = useListPages(
    sessionData?.accessToken,
    sessionData?.providerToken
  );
  const { data, error, isLoading } = listPages;
  const results = data?.results;

  const [workspace, setWorkspace] = useState([]);
  const [allPages, setAllPages] = useState([]);
  const [selectedWorkspace, setSelectedWorkspace] = useState("");
  const [selectedPage, setSelectedPage] = useState("");
  const [containsPages, setContainsPages] = useState(false);
  const [selectedNumberOfQuestions, setSelectedNumberOfQuestions] =
    useState("10");
  const [selectedQuestionDifficulty, setSelectedQuestionDifficulty] =
    useState("Easy");

  const mergeChildrenPages = (pages, workspace) => {
    const workspaceKeys = new Set(Object.keys(workspace));

    for (const [key, value] of Object.entries(pages)) {
      if (!workspaceKeys.has(key)) {
        for (const [parentKey, parentValue] of Object.entries(pages)) {
          const parentElement = parentValue.find(
            (element) => Object.keys(element)[0] === key
          );

          if (parentElement) {
            pages[parentKey].push(...value);
            delete pages[key];
            break;
          }
        }
      }
    }

    setPages(pages);
  };

  const updateSelectedWorkspace = (selectedWorkspace) => {
    if (pages[selectedWorkspace].length > 0) setContainsPages(true);
    else setContainsPages(false);
    setSelectedWorkspace(selectedWorkspace);
  };

  const updateSelectedPage = (selectedPage) => {
    setSelectedPage(selectedPage);
  };

  const updateNumberOfQuestions = (numberOfQuestions) => {
    setSelectedNumberOfQuestions(numberOfQuestions);
  };

  const updateQuestionDifficulty = (difficultyLevel) => {
    setSelectedQuestionDifficulty(difficultyLevel);
  };

  const destructurePagesObj = () => {
    let destructuredPages = {};

    pages[selectedWorkspace].forEach((element) => {
      destructuredPages[Object.keys(element)[0]] = Object.values(element)[0];
    });

    return destructuredPages;
  };

  useEffect(() => {
    if (results) {
      let pages = new defaultDict(() => []);
      let workspace = {};
      let allPages = {};

      results.forEach((result) => {
        if (result.parent.workspace || result.parent.block_id) {
          workspace[result.id] = result.properties.title.title[0].plain_text;
        } else {
          let parent_id = result.parent.page_id;
          let page = {};
          page[result.id] = result.properties.title.title[0].plain_text;

          pages[parent_id].push(page);
        }

        allPages[result.id] = result.properties.title.title[0].plain_text;
      });

      setAllPages(allPages);
      setWorkspace(workspace);
      mergeChildrenPages(pages, workspace);
    }
  }, [results]);

  if (error) return <div>Error: {error.message}</div>;

  if (isLoading) return <Loader />;

  return (
    Object.keys(workspace).length &&
    Object.keys(pages).length > 0 && (
      <div className="bg-[#1a1a19] w-full h-full flex">
        <div className="xl:w-1/2 lg:w-2/3 w-3/4 border-0 m-auto rounded-md bg-slate-100 p-6">
          <Inputs
            subHead={"Workspace"}
            options={workspace}
            updateHandler={updateSelectedWorkspace}
            defaultOption={"Select a workspace"}
            value={workspace[selectedWorkspace]}
          />
          {containsPages && selectedWorkspace && (
            <Inputs
              subHead={"Pages"}
              options={destructurePagesObj()}
              updateHandler={updateSelectedPage}
              defaultOption={"Select a page"}
              value={allPages[selectedPage]}
            />
          )}
          <Inputs
            subHead={"Number of questions"}
            updateHandler={updateNumberOfQuestions}
            value={selectedNumberOfQuestions}
          />
          <Inputs
            subHead={"Difficulty Level"}
            updateHandler={updateQuestionDifficulty}
            value={selectedQuestionDifficulty}
          />
          <div className="w-1/5 m-auto font-semibold">
            <ButtonWithImage
              icon={revision}
              activeIcon={revisionActive}
              label={"Submit"}
              onClickHandler={() => {}}
            />
          </div>
        </div>
      </div>
    )
  );
}
