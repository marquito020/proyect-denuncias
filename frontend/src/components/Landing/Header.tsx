import { Link, Outlet, NavLink } from "react-router-dom";

import sczLogo from "../../assets/escudo.png";
import { PublicRoutes } from "../../constants/routes";

function Header() {
  return (
    <>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center mb-1 gap-4 py-2 px-4 rounded-lg bg-gray-200 "
                      : "flex items-center mb-1 gap-4 hover:bg-gray-200 transition-colors py-2 px-4 rounded-lg"
                  }
                >
                  Inicio
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={PublicRoutes.MAP}
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center mb-1 gap-4 py-2 px-4 rounded-lg bg-gray-200 "
                      : "flex items-center mb-1 gap-4 hover:bg-gray-200 transition-colors py-2 px-4 rounded-lg"
                  }
                >
                  Ver Mapa
                </NavLink>
              </li>
              {/* <li>
              <a>Otros</a>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </li> */}
            </ul>
          </div>
          <Link
            to="/"
            className="btn btn-ghost normal-case text-xl hover:bg-transparent"
            title="Gobierno Autónomo Departamental de Santa Cruz"
          >
            <img src={sczLogo} alt="" width={25} />{" "}
            <h1 className="text-4xl">
              SC<span className="text-green-500">Z</span>
            </h1>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center mb-1 gap-4 py-2 px-4 rounded-lg bg-gray-200 "
                    : "flex items-center mb-1 gap-4 hover:bg-gray-200 transition-colors py-2 px-4 rounded-lg"
                }
              >
                Inicio
              </NavLink>
            </li>
            <li>
              <NavLink
                to={PublicRoutes.MAP}
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center mb-1 gap-4 py-2 px-4 rounded-lg bg-gray-200"
                    : "flex items-center mb-1 gap-4 hover:bg-gray-200 transition-colors py-2 px-4 rounded-lg"
                }
              >
                Ver Mapa
              </NavLink>
            </li>
            {/* <li tabIndex={0}>
            <details>
              <summary>Otros</summary>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </details>
          </li> */}
          </ul>
        </div>
        <div className="navbar-end">
          <Link
            to={PublicRoutes.LOGIN}
            className="text-green-700 font-bold pr-4"
          >
            Login
          </Link>
        </div>
      </div>
      <div className="">
        <Outlet />
      </div>
    </>
  );
}

export default Header;
