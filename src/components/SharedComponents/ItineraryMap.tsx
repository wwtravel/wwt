'use client'

import React, { useEffect } from "react";
import { MapContainer, Marker, TileLayer, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

interface Coordinate{
  latitude: number;
  longitude: number;
}

interface MapEventsProps{
  coordinates : Coordinate[]
}

interface MapProps {
  coordinates : Coordinate[],
  center : L.LatLngExpression | undefined,
  zoom? : number;
}

const redIcon = new L.Icon({
  iconUrl: "/icons/icon-map-marker.svg",
  iconSize: [16, 20],
  iconAnchor: [10, 23],
  popupAnchor: [0, -20],
});


const MapEvents:React.FC<MapEventsProps> = ({ coordinates }) => {
  const map = useMap();

  const waypoints: L.LatLng[] = []

  coordinates.map(coordinate => {
    waypoints.push(L.latLng(coordinate.latitude, coordinate.longitude))
  })

  useEffect(() => {
    if (map && waypoints.length) {
        // Create a routing service instance
        const routingService = L.Routing.osrmv1({
            serviceUrl: 'https://router.project-osrm.org/route/v1', // Example service
        });

        // Convert waypoints to L.Routing.Waypoint[]
        const routingWaypoints: L.Routing.Waypoint[] = waypoints.map(latLng =>
            L.routing.waypoint(latLng)
        );

        // Get the route using the routing service
        // @ts-ignore
        routingService.route(routingWaypoints, (err: Error | null, routes: L.Routing.Route[]) => {
            if (err) {
                console.error(err);
                return;
            }

            const route = routes[0]; // Get the first route

            // @ts-ignore
            const outlinePolyline1 = L.polyline(route.coordinates.map(coord => [coord.lat, coord.lng]), {
                color: 'rgba(0, 0, 0, 0.06)', // Grey outline color
                weight: 8, // Slightly larger weight for the outline
                opacity: 1 // Slight opacity for the outline
            }).addTo(map);

            // @ts-ignore
            const outlinePolyline2 = L.polyline(route.coordinates.map(coord => [coord.lat, coord.lng]), {
                color: '#FAFAF8', // Grey outline color
                weight: 5, // Slightly larger weight for the outline
                opacity: 1 // Slight opacity for the outline
            }).addTo(map);

            // @ts-ignore
            const polyline = L.polyline(route.coordinates.map(coord => [coord.lat, coord.lng]), {
                color: '#ED1C24',
                weight: 2,
                opacity: 1
            }).addTo(map);


            // Add markers for each waypoint
            routingWaypoints.forEach(waypoint => {
                const marker = L.marker(waypoint.latLng, { icon: redIcon }).addTo(map);
                // Optionally, add a popup for the marker
                marker.bindPopup(`Waypoint: ${waypoint.latLng.lat}, ${waypoint.latLng.lng}`);
            });

            // Optionally zoom to the polyline
            map.fitBounds(polyline.getBounds());
        });
    }
}, [map, waypoints]);




  return null;
}

const ItineraryMap:React.FC<MapProps> = ({ coordinates, center, zoom }) => {
  return (
    <div className="h-full w-full">
      <MapContainer center={center} scrollWheelZoom={false} zoom={zoom ? zoom : 5} style={{ height: "100%", width: "100%", zIndex: 0 }}>
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