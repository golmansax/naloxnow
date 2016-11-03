import React from 'react';
import { directions } from '../../lib/data';
import { MapView } from '../base';
import { nnBlue } from '../../styles/colors';

function latLngToCoordinate(latLng) {
  return {
    latitude: latLng.lat,
    longitude: latLng.lng,
  };
}

function getCoordinates(leg) {
  const start = leg.start_location;
  return [latLngToCoordinate(start)]
    .concat(leg.steps.map((step) => latLngToCoordinate(step.end_location)));
}

export const DirectionsPolyline = () => (
  <MapView.Polyline
    strokeColor={nnBlue}
    strokeWidth={2}
    coordinates={getCoordinates(directions.routes[0].legs[0])}
  />
);
