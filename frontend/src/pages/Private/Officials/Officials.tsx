import { lazy } from "react";

const OfficialsList = lazy(() => import("./components/OfficialsList"));

function Officials() {
  return (
    <div>
      <OfficialsList />
    </div>
  );
}

export default Officials;
  