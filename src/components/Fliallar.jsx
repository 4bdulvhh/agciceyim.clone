import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

const filiallar = [
  { id: 1, ad: "Baş Filial", lat: 40.4093, lng: 49.8671 },
  { id: 2, ad: "Elmlər Akademiyası", lat: 40.3755, lng: 49.8327 },
  { id: 3, ad: "Xalqlar Dostluğu", lat: 40.3971, lng: 49.892 },
  { id: 4, ad: "Nizami", lat: 40.3772, lng: 49.8452 },
  { id: 5, ad: "Nəriman Nərimanov", lat: 40.4154, lng: 49.8728 },
  { id: 6, ad: "Bakıxanov prospekti", lat: 40.398, lng: 49.955 },
  { id: 7, ad: "Qara Qarayev", lat: 40.421, lng: 49.911 },
  { id: 8, ad: "Binə t/m", lat: 40.3655, lng: 49.8671 },
  { id: 9, ad: "İçərişəhər", lat: 40.3667, lng: 49.837 },
  { id: 10, ad: "Xırdalan", lat: 40.4482, lng: 49.7556 },
  { id: 11, ad: "Badamdar", lat: 40.3619, lng: 49.8228 },
  { id: 12, ad: "Bakıxanov qəsəbəsi", lat: 40.421, lng: 49.955 },
  { id: 13, ad: "Bülbülə", lat: 40.389, lng: 49.956 },
  { id: 14, ad: "28 Express", lat: 40.3785, lng: 49.8475 },
  { id: 15, ad: "Ağ Şəhər", lat: 40.37, lng: 49.85 },
  { id: 16, ad: "Əhmədli", lat: 40.3855, lng: 49.933 },
  { id: 17, ad: "20 Yanvar", lat: 40.409, lng: 49.805 },
  { id: 18, ad: "Yaşıl bazar", lat: 40.395, lng: 49.882 },
  { id: 19, ad: "Xətai", lat: 40.3953, lng: 49.8822 },
  { id: 20, ad: "Sumqayıt", lat: 40.5897, lng: 49.6686 },
  { id: 21, ad: "Gəncə", lat: 40.6828, lng: 46.3606 },
  { id: 22, ad: "Lənkəran", lat: 38.754, lng: 48.85 },
];

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const FiliallarMap = () => {
  const [selectedFilial, setSelectedFilial] = useState(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (selectedFilial && map) {
      map.flyTo([selectedFilial.lat, selectedFilial.lng], 15);
    }
  }, [selectedFilial, map]);

  return (
    <div className="max-w-7xl text-center  mx-auto p-6">
      <h1 className="font-pacifico text-2xl text-center font-bold mb-6    inline-block">
        Fliallar
        <div className="h-1 bg-[#0CE6DF] w-24 mx-auto mt-2"></div>
      </h1>

      <div className="mb-6">
        <select
          onChange={(e) => {
            const selected = filiallar.find(
              (f) => f.id === parseInt(e.target.value)
            );
            setSelectedFilial(selected);
          }}
          className="w-full md:w-auto p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0CE6DF] focus:border-transparent"
        >
          <option value="">Siyahıdan filial seçin</option>
          {filiallar.map((filial) => (
            <option key={filial.id} value={filial.id}>
              {filial.ad}
            </option>
          ))}
        </select>
      </div>

      <div className="w-full h-[450px] rounded-lg overflow-hidden shadow-lg">
        <MapContainer
          center={
            selectedFilial
              ? [selectedFilial.lat, selectedFilial.lng]
              : [40.4093, 49.8671]
          }
          zoom={selectedFilial ? 15 : 12}
          style={{ height: "100%", width: "100%" }}
          ref={setMap}
          className="z-0"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {filiallar.map((filial) => (
            <Marker key={filial.id} position={[filial.lat, filial.lng]}>
              <Popup>
                <div className="font-medium">{filial.ad}</div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default FiliallarMap;
