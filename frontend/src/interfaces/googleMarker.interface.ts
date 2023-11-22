interface OptionsMarker {
  
  icon: { url: string; scaledSize: google.maps.Size };
}

export interface GoogleMarker {
  lat: number;
  lng: number;
  options?: OptionsMarker;
}
