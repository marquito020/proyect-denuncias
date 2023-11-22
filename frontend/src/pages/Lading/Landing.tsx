import { lazy } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "../../components/Landing/Header";
import { PublicRoutes } from "../../constants/routes";

const Inicio = lazy(() => import("./components/Inicio"));
const Map = lazy(() => import("./components/Map"));

function Landing() {
  return (
    <Routes>
      <Route element={<Header />}>
        {/* <Route
          path="/"
          element={<Navigate to={PublicRoutes.INICIO} replace={true} />}
        /> */}
        <Route path="/" element={<Inicio />} />
        <Route path={PublicRoutes.MAP} element={<Map />} />
      </Route>

      <Route path="*" element={<>PAGE NOT FOUNT :c</>} />
    </Routes>
  );
}

export default Landing;
