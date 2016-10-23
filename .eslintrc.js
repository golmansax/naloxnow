module.exports = {
  extends: ['golmansax/react-native'],

  rules: {
    'import/prefer-default-export': 0,
    'react/jsx-filename-extension': [2, { extensions: ['.js'] }],
  },

  env: {
    browser: true,
  },
};
