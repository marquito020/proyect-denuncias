import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";

import {
  Squares2X2Icon,
  XMarkIcon,
  Bars3Icon,
  BuildingOfficeIcon,
  DocumentTextIcon,
  UsersIcon,
  ArrowLeftOnRectangleIcon,
  FolderIcon,
} from "@heroicons/react/24/outline";

import { PrivateRoutes, PublicRoutes } from "../../constants/routes";
import { resetUser } from "../../redux/states/user.state";
import { RootState } from "../../redux/store";

function Sidebar() {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <>
      <div
        className={`fixed top-0 w-3/4 xl:left-0 md:w-64 h-full shadow-lg bg-white text-gray-700 text-sm border-r border-gray-300 p-8 flex flex-col justify-between z-50 transition-all 
    ${showMenu ? "left-0" : "-left-full"}`}
      >
        <div>
          <h1 className="text-2xl text-center text-black uppercase font-bold mb-10">
            <Link to={`${PrivateRoutes.PRIVATE}${PrivateRoutes.DASHBOARD}`}>
              Topics Project
            </Link>
          </h1>
          <ul>
            <li>
              <NavLink
                to={`${PrivateRoutes.PRIVATE}${PrivateRoutes.DASHBOARD}`}
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center mb-1 gap-4 py-2 px-4 rounded-lg bg-green-700 text-white"
                    : "flex items-center mb-1 gap-4 hover:bg-gray-200 transition-colors py-2 px-4 rounded-lg"
                }
              >
                <Squares2X2Icon className="h-5 w-5" /> Dashboard
              </NavLink>
            </li>

            {user.rolName === "admin" ? (
              <>
                <li>
                  <NavLink
                    to={`${PrivateRoutes.PRIVATE}${PrivateRoutes.AREAS}`}
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center mb-1 gap-4 py-2 px-4 rounded-lg bg-green-700 text-white"
                        : "flex items-center mb-1 gap-4 hover:bg-gray-200 transition-colors py-2 px-4 rounded-lg"
                    }
                  >
                    <BuildingOfficeIcon className="h-5 w-5" /> Áreas
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={`${PrivateRoutes.PRIVATE}${PrivateRoutes.TYPESOFCOMPLAINT}`}
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center mb-1 gap-4 py-2 px-4 rounded-lg bg-green-700 text-white"
                        : "flex items-center mb-1 gap-4 hover:bg-gray-200 transition-colors py-2 px-4 rounded-lg"
                    }
                  >
                    <DocumentTextIcon className="h-5 w-5" /> Tipos de denuncias
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={`${PrivateRoutes.PRIVATE}${PrivateRoutes.OFFICIALS}`}
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center mb-1 gap-4 py-2 px-4 rounded-lg bg-green-700 text-white"
                        : "flex items-center mb-1 gap-4 hover:bg-gray-200 transition-colors py-2 px-4 rounded-lg"
                    }
                  >
                    <UsersIcon className="h-5 w-5" /> Funcionarios
                  </NavLink>
                </li>
              </>
            ) : null}

            {user.rolName == "official" ? (
              <>
                <li>
                  <NavLink
                    to={`${PrivateRoutes.PRIVATE}${PrivateRoutes.COMPLAINTS}`}
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center mb-1 gap-4 py-2 px-4 rounded-lg bg-green-700 text-white"
                        : "flex items-center mb-1 gap-4 hover:bg-gray-200 transition-colors py-2 px-4 rounded-lg"
                    }
                  >
                    <FolderIcon className="h-5 w-5" /> Denuncias
                  </NavLink>
                </li>
              </>
            ) : null}
          </ul>
        </div>
        <button
          onClick={() => {
            dispatch(resetUser());
            navigate(PublicRoutes.LOGIN, { replace: true });
          }}
          className="flex items-center gap-2 hover:text-green-700 transition-colors py-2 px-4 rounded-lg"
        >
          <ArrowLeftOnRectangleIcon className="h-5 w-5" />
          <div>
            <h5 className="font-medium">Cerrar sesión</h5>
          </div>
        </button>
      </div>

      {/* Btn menu movil */}
      <button
        onClick={toggleMenu}
        className="xl:hidden fixed bottom-6 right-6 bg-white ring-1 ring-gray-500  p-4 rounded-full"
      >
        {showMenu ? (
          <XMarkIcon className="h-5 w-5" />
        ) : (
          <Bars3Icon className="h-5 w-5" />
        )}
      </button>
    </>
  );
}

export default Sidebar;
