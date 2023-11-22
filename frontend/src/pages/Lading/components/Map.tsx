import { useState, ChangeEvent, useMemo } from "react";
import { GoogleMap, HeatmapLayer } from "@react-google-maps/api";

import { useAllTypesComplaintWithComplaints } from "../../../hooks/useTypeComplaint";
import { useGoogleMaps } from "../../../hooks/useGoogleMaps";
import ComplaintMarker from "../../../components/ComplaintMarker";
import { complaintsFilter } from "../../../utils/filter";
import Loading from "../../Loading/Loading";

// const heatmapData: google.maps.visualization.WeightedLocation[] = [
//   { location: new google.maps.LatLng(37.782, -122.447), weight: 0.5 },
//   { location: new google.maps.LatLng(37.783, -122.448), weight: 2 },
//   { location: new google.maps.LatLng(37.784, -122.449), weight: 3 },
// ];

// const dataHot = [
//   new google.maps.LatLng(37.782, -122.447),
//   new google.maps.LatLng(37.783, -122.448),
//   new google.maps.LatLng(37.784, -122.449)
// ]

function Map() {
  const { typesComplaintWithComplaints, isLoading, error } =
    useAllTypesComplaintWithComplaints();

  // components of Google Maps
  const { map, isLoaded, onLoad, onUnmount } = useGoogleMaps();

  const [selectedTypeComplaint, setSelectedTypeComplaint] = useState("");
  const [selectedState, setselectedState] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const [withoutHeatMap, setWithoutHeatMap] = useState(true);

  const data = useMemo(() => {
    const dataLatLng: google.maps.LatLng[] = [];
    // map?.set("heatMap", []);
    typesComplaintWithComplaints?.forEach((typeComplaint) => {
      const complaints = complaintsFilter(
        typeComplaint,
        selectedTypeComplaint,
        startDate,
        endDate,
        selectedState
      );

      if (complaints) {
        complaints.forEach((complaint) => {
          if (complaint) {
            dataLatLng.push(
              new google.maps.LatLng(complaint.latitude, complaint.longitude)
            );
          }
        });
      }
    });

    return dataLatLng;
  }, [
    typesComplaintWithComplaints,
    selectedTypeComplaint,
    startDate,
    endDate,
    selectedState,
  ]);

  if (isLoading) {
    return <Loading />;
  } else if (error) {
    return <>Ocurrio un error al obtener los datos</>;
  }

  console.log(data);

  return (
    <>
      <div>
        <div className="min-w-min px-14">
          <ul className="menu bg-base-100 lg:menu-horizontal rounded-box">
            <li>
              <button
                className={`${withoutHeatMap ? "text-green-500" : ""}`}
                onClick={() => setWithoutHeatMap(true)}
              >
                Vista normal
              </button>
            </li>
            <li>
              <button
                className={`${!withoutHeatMap ? "text-green-500" : ""}`}
                onClick={() => setWithoutHeatMap(false)}
              >
                Ver mapa de calor
              </button>
            </li>
            <li>
              <select
                className="bg-white"
                value={selectedTypeComplaint}
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  setSelectedTypeComplaint(e.target.value)
                }
              >
                <option disabled value="">
                  Tipo de denuncia
                </option>
                <option value="">Ninguno</option>
                {typesComplaintWithComplaints?.map((typeComplaint) => (
                  <option key={typeComplaint._id} value={typeComplaint._id}>
                    {typeComplaint.name}
                  </option>
                ))}
              </select>
            </li>
            <li>
              <select
                className="bg-white"
                value={selectedState}
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  setselectedState(e.target.value)
                }
              >
                <option disabled value="">
                  Estado
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
          </ul>
          {isLoaded ? (
            <GoogleMap
              mapContainerStyle={{ width: "auto", height: "500px" }}
              zoom={10}
              center={{ lat: -17.782935, lng: -63.180819 }}
              onLoad={onLoad}
              onUnmount={onUnmount}
            >
              {withoutHeatMap
                ? typesComplaintWithComplaints?.map((typeComplaint, index) => {
                    // filtering data
                    const complaints = complaintsFilter(
                      typeComplaint,
                      selectedTypeComplaint,
                      startDate,
                      endDate,
                      selectedState
                    );

                    return complaints?.map((complaint) => {
                      return (
                        complaint != null && (
                          <ComplaintMarker
                            key={complaint._id}
                            typeComplaintName={typeComplaint.name}
                            index={index}
                            complaint={complaint}
                            map={map}
                          />
                        )
                      );
                    });
                  })
                : null}
              <HeatmapLayer
                data={!withoutHeatMap ? data : []}
                options={{ dissipating: true, map, opacity: 1 }}
              />
            </GoogleMap>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default Map;
