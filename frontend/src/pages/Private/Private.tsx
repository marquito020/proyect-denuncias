import { lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { PrivateRoutes } from "../../constants/routes";

import MainContent from "../../components/Dashboard/MainContent";

const Dashboard = lazy(() => import("./Dashboard/Dashboard"));

const Area = lazy(() => import("./Area/Area"));
const AddArea = lazy(() => import("./Area/components/AddArea"));
const ShowArea = lazy(() => import("./Area/components/ShowArea"));
const UpdateArea = lazy(() => import("./Area/components/UpdateArea"));

const TypeOfComplaint = lazy(() => import("./TypeOfComplaint/TypeOfComplaint"));
const AddTypeOfComplaint = lazy(() => import("./TypeOfComplaint/components/AddTypeOfComplaint"));
const ShowTypeOfComplaint = lazy(() => import("./TypeOfComplaint/components/ShowTypeOfComplaint"));
const UpdateTypeOfComplaint = lazy(() => import("./TypeOfComplaint/components/UpdateTypeOfComplaint"));

const Officials = lazy(() => import("./Officials/Officials"));
const AddOfficial = lazy(() => import("./Officials/components/AddOfficial"));
const ShowOfficial = lazy(() => import("./Officials/components/ShowOfficial"));
const UpdateOfficial = lazy(() => import("./Officials/components/UpdateOfficial"));

const Complaints = lazy(() => import("./Complaints/Complaints"))
const ComplaintsMap = lazy(() => import("./Complaints/components/ComplaintsMap"))
const ShowComplaint = lazy(() => import("./Complaints/components/ShowComplaint"))
const ShowMapComplaint = lazy(() => import("./Complaints/components/ShowMapComplaint"))

function Private() {
  return (
    <Routes>
      <Route element={<MainContent />}>

        <Route
          path="/"
          element={
            <Navigate
              to={`${PrivateRoutes.PRIVATE}${PrivateRoutes.DASHBOARD}`}
              replace={true}
            />
          }
        />

        <Route path={PrivateRoutes.DASHBOARD} element={<Dashboard />} />
        
        <Route path={PrivateRoutes.AREAS} element={<Area />} />
        <Route path={`${PrivateRoutes.AREAS}/add`} element={<AddArea />} />
        <Route path={`${PrivateRoutes.AREAS}/show/:id`} element={<ShowArea />} />
        <Route path={`${PrivateRoutes.AREAS}/edit/:id`} element={<UpdateArea />} />

        <Route path={PrivateRoutes.TYPESOFCOMPLAINT} element={<TypeOfComplaint />} />
        <Route path={`${PrivateRoutes.TYPESOFCOMPLAINT}/add`} element={<AddTypeOfComplaint />} />
        <Route path={`${PrivateRoutes.TYPESOFCOMPLAINT}/show/:id`} element={<ShowTypeOfComplaint />} />
        <Route path={`${PrivateRoutes.TYPESOFCOMPLAINT}/edit/:id`} element={<UpdateTypeOfComplaint />} />

        <Route path={PrivateRoutes.OFFICIALS} element={<Officials />} />
        <Route path={`${PrivateRoutes.OFFICIALS}/add`} element={<AddOfficial />} />
        <Route path={`${PrivateRoutes.OFFICIALS}/show/:id`} element={<ShowOfficial />} />
        <Route path={`${PrivateRoutes.OFFICIALS}/edit/:id/:userId`} element={<UpdateOfficial />} />
        
        <Route path={PrivateRoutes.COMPLAINTS} element={<Complaints />} />
        <Route path={`${PrivateRoutes.COMPLAINTS}/map`} element={<ComplaintsMap />} />
        <Route path={`${PrivateRoutes.COMPLAINTS}/show/:id/:personId`} element={<ShowComplaint />} />
        <Route path={`${PrivateRoutes.COMPLAINTS}/show/map/:id`} element={<ShowMapComplaint />} />

      </Route>

      <Route path="*" element={<>PAGE NOT FOUNT :c</>} />
    </Routes>
  );
}

export default Private;
