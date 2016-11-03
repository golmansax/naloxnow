const lookup = {
  /* eslint-disable global-require */
  odrLogo: require('../assets/images/odrlogo_whitetransparent.png'),
  /* eslint-enable global-require */
};

export const images = Object.keys(lookup).map((key) => lookup[key]);

export function getImage(key) {
  if (!lookup[key]) {
    throw new Error(`Image with key not found: ${key}`);
  }

  return lookup[key];
}
