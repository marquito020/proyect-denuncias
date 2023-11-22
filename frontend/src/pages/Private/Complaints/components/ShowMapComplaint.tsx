import { memo } from 'react'
import { useParams, Link } from "react-router-dom";

import { GoogleMap } from "@react-google-maps/api";
import { useGoogleMaps } from "../../../../hooks/useGoogleMaps";

import Loading from "../../../Loading/Loading";
import { useGetComplaint } from "../../../../hooks/useComplaint";
import ComplaintMarker from "../../../../components/ComplaintMarker";
import { PrivateRoutes } from "../../../../constants/routes";

function ShowMapComplaint() {
  const { id } = useParams();
  const { complaintFound, isLoading, error } = useGetComplaint(`${id}`);
  // components of Google Maps
  const { map, isLoaded, onLoad, onUnmount } = useGoogleMaps();

  if (isLoading) {
    return <Loading />;
  } else if (error) {
    return <div>Ocurrio un error en el server</div>;
  }

  return (
    <div className="card flex-shrink-0 w-full shadow-2xl bg-base-100 mt-16">
      <label className="label text-center text-base">
        <Link
          to={`${PrivateRoutes.PRIVATE}${PrivateRoutes.COMPLAINTS}/show/${complaintFound?._id}/${complaintFound?.personId}`}
          className="link link-hover"
        >
          <button className="btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
              />
            </svg>
            Atras
          </button>
        </Link>
      </label>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={{ width: "auto", height: "500px" }}
          zoom={10}
          center={{
            lat: complaintFound!.latitude,
            lng: complaintFound!.longitude,
          }}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          <ComplaintMarker
            key={complaintFound!._id}
            typeComplaintName={complaintFound!.title}
            index={0}
            complaint={complaintFound!}
            map={map}
          />
        </GoogleMap>
      ) : null}
    </div>
  );
}

export default memo(ShowMapComplaint);
