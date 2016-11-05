export const requestor = {
  title: 'Roger Wong',
  location: {
    latitude: 37.781115,
    longitude: -122.411625,
  },
};

export const deliveryProviders = [
  {
    id: 'uber',
    title: 'Holman Gao',
    subtitle: '5 star Uber driver',
    time: 11,
    location: {
      // Saigon Sandwich
      latitude: 37.783156,
      longitude: -122.417475,
      rotation: '80deg',
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
      rotation: '150deg',
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
      rotation: '-30deg',
    },
  },
  {
    id: 'uber3',
    title: 'Random person',
    subtitle: '253 2nd Ave, San Mateo, CA',
    time: 7,
    location: {
      // The Mosser
      latitude: 37.785057,
      longitude: -122.404901,
      rotation: '50deg',
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
