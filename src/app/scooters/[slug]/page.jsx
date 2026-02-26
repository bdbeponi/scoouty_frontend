// src/app /scooters/page.jsx

import React, { Suspense } from "react";
import ScootersBrandFilter from "./_components/ScootersBrandFilter";

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ScootersBrandFilter />
    </Suspense>
  );
};

export default page;
