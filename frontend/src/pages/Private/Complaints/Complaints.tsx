import { lazy } from "react";

const ComplaintsList = lazy(() => import("./components/ComplaintsList"));

function Complaints() {
  return (
    <div>
      <ComplaintsList />
    </div>
  );
}

export default Complaints;
