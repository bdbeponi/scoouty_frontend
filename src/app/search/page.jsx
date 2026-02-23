// src/app/search/page.jsx

import React, { Suspense } from "react";
import SearchResultsComponents from "./_components/SearchResultsComponents";

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchResultsComponents />
    </Suspense>
  );
};

export default page;
