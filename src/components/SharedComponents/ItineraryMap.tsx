'use client'

import React, { useEffect } from "react";
import { MapContainer, Marker, TileLayer, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import L from "leaflet";
import "leaflet-routing-machine";

interface Coordinate{
  latitude: number;
  longitude: number;
}

interface MapEventsProps{
  coordinates : Coordinate[]
}

interface MapProps {
  coordinates : Coordinate[],
  center : L.LatLngExpression | undefined
}

const redIcon = new L.Icon({
  iconUrl: "/icons/icon-map-marker.svg",
  iconSize: [16, 20],
  iconAnchor: [10, 20],
  popupAnchor: [0, -20],
});


const MapEvents:React.FC<MapEventsProps> = ({ coordinates }) => {
  const map = useMap();

  const waypoints: L.LatLng[] = []

  coordinates.map(coordinate => {
    waypoints.push(L.latLng(coordinate.latitude, coordinate.longitude))
  })

  useEffect(() => {
    if (map) {

        const plan = L.Routing.plan(waypoints,
            {
                addWaypoints: false,
                draggableWaypoints: false,
                createMarker(waypointIndex, waypoint, numberOfWaypoints) {
                    return L.marker(waypoint.latLng, { icon: redIcon });
                },
            }
        )

        L.Routing.control({
            plan: plan,
            containerClassName: 'itinerary',
            addWaypoints: false
        }).addTo(map)
    }
  }, [map]);

  return null;
}

const ItineraryMap:React.FC<MapProps> = ({ coordinates, center }) => {
  return (
    <div className="h-full w-full">
      <MapContainer center={center} scrollWheelZoom={false} zoom={10} style={{ height: "100%", width: "100%", zIndex: 0 }}>
        <TileLayer
          attribution='Map tiles by <a href="https://carto.com/attributions">CARTO</a>, under <a href="https://creativecommons.org/licenses/by/3.0/">CC BY 3.0</a>. Data by <a href="https://www.openstreetmap.org">OpenStreetMap</a>, under ODbL.'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />

        <MapEvents coordinates={coordinates}/>
      </MapContainer>
    </div>
  );
};

export default ItineraryMap;