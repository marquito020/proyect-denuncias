import { useState } from "react";

import { Marker, InfoWindow } from "@react-google-maps/api";
import { Complaint } from "../interfaces/complaint.interface";

interface Props {
  typeComplaintName: string;
  index: number;
  complaint: Complaint;
  map: google.maps.Map | null;
  showComplaint?: () => void;
}

const colors: string[] = [
  "blue",
  "purple",
  "teal",
  "fuchsia",
  "black",
  "aqua",
  "red",
  "lime",
  "yellow",
  "orange",
];

function ComplaintMarker({
  typeComplaintName,
  index,
  complaint,
  map,
  showComplaint,
}: Props) {
  const [selectedComplaint, setselectedComplaint] = useState("");

  return (
    <Marker
      key={complaint._id}
      // onLoad={(marker) => {
      //   map?.setValues(marker);
      // }}

      visible={!!map}
      position={{ lat: complaint.latitude, lng: complaint.longitude }}
      title={typeComplaintName}
      options={{
        icon: {
          fillColor: colors[index], // Color de relleno del círculo
          fillOpacity: 1, // Opacidad del relleno del círculo (0 a 1)
          strokeColor: colors[index], // Color del borde del círculo
          strokeOpacity: 0.8, // Opacidad del borde del círculo (0 a 1)
          scale: 4,
          path: google.maps.SymbolPath.CIRCLE,
        },
        map,
      }}
      onClick={() => setselectedComplaint(complaint._id)}
    >
      {selectedComplaint == complaint._id ? (
        <InfoWindow onCloseClick={() => setselectedComplaint("")}>
          <div className="text-black">
            <p>{complaint.title}</p>
            {showComplaint ? (
              <div className="flex justify-end mt-4">
                <button
                  className="btn btn-neutral btn-xs"
                  onClick={showComplaint}
                >
                  ver
                </button>
              </div>
            ) : null}
          </div>
        </InfoWindow>
      ) : null}
    </Marker>
  );
}

export default ComplaintMarker;
