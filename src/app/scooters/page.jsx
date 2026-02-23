// src/app /scooters/page.jsx

import React, { Suspense } from "react";
import ScootersFilterComponents from "./_components/ScootersFilterComponents";

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ScootersFilterComponents />
    </Suspense>
  );
};

export default page;
