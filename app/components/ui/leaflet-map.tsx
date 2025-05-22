import L, { Icon, LatLngExpression } from "leaflet";
import { Map as MapIcon, MapPin, Phone } from "lucide-react";
import React from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  Tooltip,
  useMap,
} from "react-leaflet";

// Lucide MapPin SVG string (renk ve boyutunu ihtiyaca göre ayarlayabilirsin)
const mapPinSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
  <path
    d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"
    fill="rgb(3,117,242)"
    stroke="rgb(3,117,242)"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
  <circle
    cx="12"
    cy="10"
    r="4"
    fill="#fff"
    stroke="rgb(3,117,242)"
    stroke-width="2"
  />
</svg>
`;

const lucideMarkerIcon = new Icon({
  iconUrl: "data:image/svg+xml;base64," + btoa(mapPinSvg),
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

type Location = {
  name: string;
  coordinate: LatLngExpression;
  image: string;
  popupTitle: string;
  popupDesc: string;
  address: string;
  phone: string;
  phoneHref: string;
  mapsHref: string;
  tooltip: string;
};

const locations: Location[] = [
  {
    name: "Istanbul",
    coordinate: [41.0082, 28.9784],
    image:
      "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    popupTitle: "İstanbul Ofisi",
    popupDesc: "Türkiye'nin ekonomik ve kültürel başkenti",
    address: "Nakkaştepe, Azizbey Sk. No:1",
    phone: "+90 216 531 00 00",
    phoneHref: "tel:+902165310000",
    mapsHref: "https://maps.google.com/?q=41.0082,28.9784",
    tooltip: "Istanbul Office",
  },
  {
    name: "Dubai",
    coordinate: [25.276987, 55.296249],
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    popupTitle: "Dubai Office",
    popupDesc: "Orta Doğu operasyon merkezimiz",
    address: "Dubai Business Center, Sheikh Zayed Rd.",
    phone: "+971 4 000 0000",
    phoneHref: "tel:+971400000000",
    mapsHref: "https://maps.google.com/?q=25.276987,55.296249",
    tooltip: "Dubai Office",
  },
];

const MapBounds: React.FC<{ locations: Location[] }> = ({ locations }) => {
  const map = useMap();
  React.useEffect(() => {
    const bounds = L.latLngBounds(locations.map((l) => l.coordinate));
    map.fitBounds(bounds, { padding: [40, 40] });
  }, [locations, map]);
  return null;
};

const LocationMapSection: React.FC = () => (
  <section className="bg-white py-12">
    <div className="container mx-auto px-4">
      {/* ... başlık ve açıklama ... */}
      <div
        id="location-map"
        className="relative mb-8 h-[320px] w-full overflow-hidden rounded-lg border border-gray-200 shadow-sm sm:h-[480px]"
        data-layer="Light"
      >
        <MapContainer
          center={[36.5, 39.5]}
          zoom={4}
          scrollWheelZoom={true}
          style={{ height: "100%", width: "100%" }}
          className="map-container"
        >
          <TileLayer
            attribution='&copy; <a href="https://carto.com/">Carto</a> contributors'
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          />
          <MapBounds locations={locations} />
          {locations.map((loc) => (
            <Marker
              key={loc.name}
              position={loc.coordinate}
              icon={lucideMarkerIcon}
            >
              <Tooltip direction="top" offset={[0, -20]}>
                {loc.tooltip}
              </Tooltip>
              <Popup>
                <div className="bg-primary-700 border-primary-700 flex h-44 w-full max-w-xs flex-row overflow-hidden rounded border sm:h-auto sm:max-w-sm sm:flex-col md:max-w-md">
                  <div className="h-44 w-20 flex-shrink-0 bg-gray-200 sm:h-32 sm:w-full">
                    <img
                      src={loc.image}
                      alt={loc.name}
                      className="h-44 w-full object-cover"
                    />
                  </div>
                  <div className="flex w-full flex-col justify-center p-3 sm:p-5">
                    <h3 className="mb-1 text-base font-bold text-white sm:text-lg">
                      {loc.popupTitle}
                    </h3>
                    <p className="text-primary-100 mb-2 text-xs">
                      {loc.popupDesc}
                    </p>
                    <div className="text-primary-50 mb-1 flex items-start gap-2 text-xs">
                      <MapPin
                        className="mt-0.5 h-4 w-4 flex-shrink-0 text-white"
                        strokeWidth={2}
                      />
                      <span className="leading-tight">{loc.address}</span>
                    </div>
                    <div className="text-primary-50 mb-1 flex items-center gap-2 text-xs">
                      <Phone
                        className="h-4 w-4 flex-shrink-0 text-white"
                        strokeWidth={2}
                      />
                      <a
                        href={loc.phoneHref}
                        className="font-medium !text-white hover:underline"
                      >
                        {loc.phone}
                      </a>
                    </div>
                    <div className="mt-2 flex">
                      <a
                        href={loc.mapsHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:bg-primary-100 text-primary-700 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-semibold transition"
                      >
                        <MapIcon className="h-4 w-4" strokeWidth={2} />
                        Open in Maps
                      </a>
                    </div>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  </section>
);

export default LocationMapSection;
