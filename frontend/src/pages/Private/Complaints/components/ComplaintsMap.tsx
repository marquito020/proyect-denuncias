import { ChangeEvent, useState, memo } from "react";
import { Link, useNavigate } from "react-router-dom";

import { GoogleMap } from "@react-google-maps/api";
import Loading from "../../../Loading/Loading";
import { socket } from "../../../../config/socket";

import { useAllComplaintsOfficial } from "../../../../hooks/useComplaint";
import { useAllTypesOfComplainst } from "../../../../hooks/useTypeComplaint";

import { PrivateRoutes } from "../../../../constants/routes";
import { validateFilter } from "../../../../utils/filter";
import { useGoogleMaps } from "../../../../hooks/useGoogleMaps";
import ComplaintMarker from "../../../../components/ComplaintMarker";
import { UserInfo } from "../../../../interfaces/user.interface";

function ComplaintsMap() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") as string) as UserInfo;
  const { complaints, isLoading, error, mutate } = useAllComplaintsOfficial(
    user.personId
  );

  // components of Google Maps
  const { map, isLoaded, onLoad, onUnmount } = useGoogleMaps();

  const {
    typesOfComplaints,
    isLoading: isLoadingTypes,
    error: errorTypes,
  } = useAllTypesOfComplainst();

  const [selectedTypeComplaint, setSelectedTypeComplaint] = useState("");
  const [selectedState, setselectedState] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

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
        </li>
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
            type="date"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setStartDate(new Date(`${e.target.value}T00:00`));
            }}
          />
        </li>
        <li>
          <input
            type="date"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setEndDate(new Date(`${e.target.value}T23:59`));
            }}
          />
        </li>
      </ul>
      {isLoaded ? (
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

export default memo(ComplaintsMap);
