import React, { useEffect, useContext, useState } from "react";
import useSession from "../hooks/useSession";
import useListPages from "../hooks/useListPages";
import Loader from "../Loader";
import { Context } from "../context/contextProvider";
import defaultDict from "../utils/defaultDict";

export default function Pages() {
  const session = useSession();
  const { data: sessionData } = session;
  const { pages, setPages } = useContext(Context);
  const [workspace, setWorkspace] = useState([]);

  const listPages = useListPages(
    sessionData?.accessToken,
    sessionData?.providerToken
  );
  const { data, error, isLoading } = listPages;
  const results = data?.results;

  const mergeChildrenPages = (pages, workspace) => {
    const workspaceKeys = new Set(Object.keys(workspace));

    for (const [key, value] of Object.entries(pages)) {
      if (!workspaceKeys.has(key)) {
        for (const [parentKey, parentValue] of Object.entries(pages)) {
          const parentElement = parentValue.find(
            (element) => element.id === key
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

  useEffect(() => {
    if (results) {
      let pages = new defaultDict(() => []);
      let workspace = {};

      results.forEach((result) => {
        if (result.parent.workspace) {
          workspace[result.id] = result.properties.title.title[0].plain_text;
        } else {
          let parent_id = result.parent.page_id
            ? result.parent.page_id
            : `block-${result.parent.block_id}`;
          pages[parent_id].push({
            id: result.id,
            title: result.properties.title.title[0].plain_text,
          });
        }
      });

      setWorkspace(workspace);
      mergeChildrenPages(pages, workspace);
    }
  }, [results]);

  if (error) return <div>Error: {error.message}</div>;

  if (isLoading) return <Loader />;

  return (
    Object.keys(workspace).length &&
    Object.keys(pages).length > 0 && (
      <div className="bg-[#1a1a19] w-full h-full pt-20">
        <div className="w-3/4 border-0 m-auto rounded-md bg-slate-100 p-6">
          <div className="flex flex-row gap-4 w-full">
            <div className="w-1/2">Pages</div>
            <div className="w-1/4">System Design</div>
          </div>
          <div className="flex flex-row gap-4 w-full">
            <div className="w-1/2">Number of questions</div>
            <div className="w-1/4">1</div>
          </div>
          <div className="flex flex-row gap-4 w-full">
            <div className="w-1/2">Difficulty Level</div>
            <div className="w-1/4">Easy</div>
          </div>
          <div className="w-1/2 mx-auto">
            <div className="w-1/2 mx-auto">
              <button className="border-2 bg-white border-white text-slate-900 font-semibold py-2 px-4 rounded-md my-4 mr-6 hover:bg-slate-900 hover:text-white cursor-pointer mx-auto">
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
