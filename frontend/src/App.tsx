import { lazy, Suspense } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SWRConfig } from "swr";

import { store } from "./redux/store";
import { PrivateRoutes, PublicRoutes } from "./constants/routes";
import Loading from "./pages/Loading/Loading";

import Authenticate from "./guards/Authenticate";

const Landing = lazy(() => import("./pages/Lading/Landing"));
const Login = lazy(() => import("./pages/Login/Login"));
const Private = lazy(() => import("./pages/Private/Private"));

function App() {
  return (
    <Provider store={store}>
      <SWRConfig value={{ revalidateOnFocus: false }}>
        <Suspense fallback={<Loading />}>
          <BrowserRouter>
            <Routes>
              <Route path="/*" element={<Landing />} />
              {/* <Route path={PublicRoutes.LANDING} element={<Landing />} /> */}
              <Route path={PublicRoutes.LOGIN} element={<Login />} />
              <Route element={<Authenticate />}>
                <Route
                  path={`${PrivateRoutes.PRIVATE}/*`}
                  element={<Private />}
                />
              </Route>
              <Route path="*" element={<>PAGE NOT FOUNT :c</>} />
            </Routes>
          </BrowserRouter>
        </Suspense>
      </SWRConfig>
    </Provider>
  );
}

export default App;
