import { ChangeEvent, useState } from "react";
// import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { GoogleMap } from "@react-google-maps/api";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

import Loading from "../../../Loading/Loading";
import { socket } from "../../../../config/socket";
import { useGoogleMaps } from "../../../../hooks/useGoogleMaps";

import { useAllComplaintsOfficial } from "../../../../hooks/useComplaint";
import { useAllTypesOfComplainst } from "../../../../hooks/useTypeComplaint";

import { stateColor } from "../../../../utils/stateColor";
import { PrivateRoutes } from "../../../../constants/routes";
import { validateFilter } from "../../../../utils/filter";
// import { RootState } from "../../../../redux/store";
import { UserInfo } from "../../../../interfaces/user.interface";
import ComplaintMarker from "../../../../components/ComplaintMarker";

socket.on("connect", () => {
  console.log(socket.connected); // true
});

function ComplaintsList() {
  const navigate = useNavigate();
  // const user = useSelector((state: RootState) => state.user);
  const user = JSON.parse(localStorage.getItem("user") as string) as UserInfo;
  const { complaints, isLoading, error, mutate } = useAllComplaintsOfficial(
    user.personId
  );

  const {
    typesOfComplaints,
    isLoading: isLoadingTypes,
    error: errorTypes,
  } = useAllTypesOfComplainst();

  // components of Google Maps
  const { map, isLoaded, onLoad, onUnmount } = useGoogleMaps();

  const [selectedTypeComplaint, setSelectedTypeComplaint] = useState("");
  const [selectedState, setselectedState] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const [viewList, setViewList] = useState(true);

  if (isLoading || isLoadingTypes) {
    return <Loading />;
  } else if (error || errorTypes) {
    return <div>Ocurrio un error al cargar los dato</div>;
  }

  socket.on("newComplaint", (arg) => {
    console.log(arg);
    mutate();
  });

  return (
    <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-lg mt-16">
      <div className="flex justify-between mb-2">
        <div>
          <h1 className="text-green-500 text-base font-medium">
            Recepción de denuncias
          </h1>
          <p className="text-gray-500">Hay {complaints?.length} denuncias</p>
        </div>
      </div>
      <ul className="menu bg-base-100 lg:menu-horizontal rounded-box">
        <li>
          <button
            className={`${viewList ? "bg-gray-200" : ""}`}
            onClick={() => setViewList(true)}
          >
            Vista en lista
          </button>
        </li>
        <li>
          <button
            className={`${!viewList ? "bg-gray-200" : ""}`}
            onClick={() => setViewList(false)}
          >
            Vista en mapa
          </button>
        </li>
        {/* <li>
          <button
            onClick={async () => {
              mutate();
              console.log("hola mundo");
              socket.emit("hello from client", "HOLA MUNDO");
              try {
                const res = await fetch("http://localhost:3000/api/isAlive");
                console.log(res);
              } catch (error) {
                console.log(error);
              }
            }}
          >
            hacer fetch
          </button>
        </li> */}
        {/* <li>
          <Link
            to={`${PrivateRoutes.PRIVATE}${PrivateRoutes.COMPLAINTS}`}
            className="link link-hover"
          >
            Ver en lista
          </Link>
        </li>
        <li>
          <Link
            to={`${PrivateRoutes.PRIVATE}${PrivateRoutes.COMPLAINTS}/map`}
            className="link link-hover"
          >
            Ver en mapa
          </Link>
        </li> */}
      </ul>
      <ul className="menu bg-base-100 lg:menu-horizontal rounded-box">
        <li>
          <button
            onClick={() => {
              setSelectedTypeComplaint("");
              setselectedState("");
              setStartDate(null);
              setEndDate(null);
            }}
          >
            Limpiar filtro
          </button>
        </li>
        <li>
          <select
            value={selectedTypeComplaint}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setSelectedTypeComplaint(e.target.value)
            }
            className="bg-white"
          >
            <option disabled value="">
              Tipo de denuncia
            </option>
            <option value="">Ninguno</option>
            {typesOfComplaints?.map((typeComplaint) => {
              const typeComplaintIdSet = new Set();

              for (const element of complaints!) {
                typeComplaintIdSet.add(element.typeComplaintId);
              }

              if (typeComplaintIdSet.has(`${typeComplaint._id}`)) {
                return (
                  <option key={typeComplaint._id} value={typeComplaint._id}>
                    {typeComplaint.name}
                  </option>
                );
              }
            })}
          </select>
        </li>
        <li>
          <select
            value={selectedState}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setselectedState(e.target.value)
            }
            className="bg-white"
          >
            <option disabled value="">
              Estados
            </option>
            <option value="">Ninguno</option>
            <option key="pendiente" value="pendiente">
              Pendiente
            </option>
            <option key="aceptado" value="aceptado">
              Aceptado
            </option>
            <option key="rechazado" value="rechazado">
              Rechazado
            </option>
            <option key="cancelado" value="cancelado">
              Cancelado
            </option>
          </select>
        </li>
        <li>
          <input
            title="Fecha de inicio"
            type="date"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setStartDate(new Date(`${e.target.value}T00:00`));
            }}
          />
        </li>
        <li>
          <input
            title="Fecha fin"
            type="date"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setEndDate(new Date(`${e.target.value}T23:59`));
            }}
          />
        </li>
      </ul>
      {viewList ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 px-3 py-4 border-b border-gray-200 text-gray-900">
          {complaints?.map((complaint) => {
            const isOk = validateFilter(
              complaint,
              selectedTypeComplaint,
              startDate,
              endDate,
              selectedState
            );

            if (!isOk) return null;

            return (
              <div
                key={complaint._id}
                className="card bg-base-100 shadow-xl shadow-green-100"
              >
                <figure>
                  <img src={complaint.photos[0]} alt={complaint.title} />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{complaint.title} </h2>
                  <p>{complaint.description}</p>
                  <div className="badge badge-neutral">{complaint.state}</div>
                  <div className="bg-gray-400 h-2 rounded-lg overflow-hidden mt-2 mb-4">
                    <div
                      className={`${stateColor(
                        complaint.state
                      )} w-full h-full rounded-lg shadow-md`}
                    ></div>
                  </div>
                  <div className="card-actions justify-end">
                    {/*  "en-us" */}
                    <p>
                      {new Date(complaint.createdAt).toLocaleDateString("es", {
                        weekday: "short",
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                    <button
                      className="btn btn-sm"
                      onClick={() => {
                        navigate(
                          `${PrivateRoutes.PRIVATE}${PrivateRoutes.COMPLAINTS}/show/${complaint._id}/${complaint.personId}`
                        );
                      }}
                    >
                      Ver
                      <ChevronRightIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : null}
      {isLoaded && !viewList ? (
        <GoogleMap
          mapContainerStyle={{ width: "auto", height: "500px" }}
          zoom={10}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          {complaints?.map((complaint) => {
            const isOk = validateFilter(
              complaint,
              selectedTypeComplaint,
              startDate,
              endDate,
              selectedState
            );

            if (!isOk) return null;

            return (
              <ComplaintMarker
                key={complaint._id}
                typeComplaintName={complaint.title}
                index={0}
                complaint={complaint}
                map={map}
                showComplaint={() => {
                  navigate(
                    `${PrivateRoutes.PRIVATE}${PrivateRoutes.COMPLAINTS}/show/${complaint._id}/${complaint.personId}`
                  );
                }}
              />
            );
          })}
        </GoogleMap>
      ) : null}
    </div>
  );
}

export default ComplaintsList;
