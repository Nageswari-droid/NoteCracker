import useListPages from "../hooks/useListPages";
import useSession from "../hooks/useSession";
import Loader from "../Loader";
import LogoutBar from "./LogoutBar";
import Pages from "./Pages";
import defaultDict from "../utils/defaultDict";
import { useContext, useEffect } from "react";
import { Context } from "../context/contextProvider";
import { homepage } from "../constants/text";

export default function Home() {
  const session = useSession();
  const { setPages, setAllPages, setWorkspace, allPages } = useContext(Context);
  const { data: sessionData } = session;
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

  useEffect(() => {
    if (results) {
      let pages = new defaultDict(() => []);
      let workspace = {};
      let allPages = {};

      results.forEach((result) => {
        let page = {};
        let id = result.id;
        let title = result.properties.title.title[0].plain_text;

        if (result.parent.workspace || result.parent.block_id) {
          workspace[id] = title;
          page[id] = homepage;
          pages[id].push(page);
        } else {
          let parent_id = result.parent.page_id;
          page[id] = title;
          pages[parent_id].push(page);
        }

        allPages[id] = title;
      });

      setAllPages(allPages);
      setWorkspace(workspace);
      mergeChildrenPages(pages, workspace);
    }
  }, [results]);

  if (error) return <div>Error: {error.message}</div>;

  if (isLoading) return <Loader />;

  return (
    <div className="bg-[#1a1a19] w-full h-full">
      <LogoutBar />
      {allPages && <Pages />}
    </div>
  );
}
