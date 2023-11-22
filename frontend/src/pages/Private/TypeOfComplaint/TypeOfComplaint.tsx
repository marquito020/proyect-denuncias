import { lazy } from "react";

const TypeOfComplaintList = lazy(
  () => import("./components/TypeOfComplaintList")
);

function TypeOfComplaint() {
  return (
    <div className="mt-16">
      <TypeOfComplaintList />
    </div>
  );
}

export default TypeOfComplaint;
