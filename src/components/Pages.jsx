import React, { useEffect, useState } from "react";
import useSession from "../hooks/useSession";
import useListPages from "../hooks/useListPages";
import Loader from "../Loader";

export default function Pages() {
  const session = useSession();
  const { data: sessionData } = session;

  const listPages = useListPages(
    sessionData?.accessToken,
    sessionData?.providerToken
  );
  const { data, error, isLoading } = listPages;

  if (isLoading) return <Loader />;

  return (
    <div>
      <h1>Pages</h1>
    </div>
  );
}
