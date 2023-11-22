import { lazy } from "react";

const AreaList = lazy(() => import("./components/AreaList"));

function Area() {
  return (
    <div>
      <AreaList />
    </div>
  );
}

export default Area;
