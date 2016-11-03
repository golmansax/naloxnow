export const requestor = {
  title: 'John Doe',
  location: {
    latitude: 37.781115,
    longitude: -122.411625,
  },
};

export const deliveryProviders = [
  {
    id: 'uber',
    title: 'Uber driver',
    subtitle: '253 2nd Ave, San Mateo, CA',
    time: 7,
    location: {
      // Saigon Sandwich
      latitude: 37.783156,
      longitude: -122.417475,
    },
  },
  {
    id: 'uber2',
    title: 'Random person',
    subtitle: '253 2nd Ave, San Mateo, CA',
    time: 5,
    location: {
      // Deli Board
      latitude: 37.777642,
      longitude: -122.406457,
    },
  },
  {
    id: 'p2p',
    title: 'Random person',
    subtitle: '253 2nd Ave, San Mateo, CA',
    time: 4,
    location: {
      // Cellarmaker
      latitude: 37.777120,
      longitude: -122.410657,
    },
  },
  {
    id: 'uber3',
    title: 'Random person',
    subtitle: '253 2nd Ave, San Mateo, CA',
    time: 7,
    location: {
      // REI
      latitude: 37.773091,
      longitude: -122.404331,
    },
  },
];

export const pickupProviders = [
  {
    id: 'walgreens',
    title: 'Walgreens',
    subtitle: '253 2nd Ave, San Mateo, CA',
    time: 8,
    location: {
      latitude: 37.783156,
      longitude: -122.417475,
    },
  },
];

export const provider = deliveryProviders[0];

export const midpointLocation = {
  latitude: 37.780681,
  longitude: -122.414932,
};

export directions from './directions.json';
