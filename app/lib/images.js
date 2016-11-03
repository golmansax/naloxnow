const lookup = {
  /* eslint-disable global-require */
  odrLogo: require('../assets/images/odresponse_fastcross_logo.png'),
  chevron: require('../assets/images/chevron_white.png'),
  breathing: require('../assets/images/red_air_breathing.png'),
  needle: require('../assets/images/red_administer_needle.png'),
  /* eslint-enable global-require */
};

export const images = Object.keys(lookup).map((key) => lookup[key]);

export function getImage(key) {
  if (!lookup[key]) {
    throw new Error(`Image with key not found: ${key}`);
  }

  return lookup[key];
}
