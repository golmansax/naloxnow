#!/usr/bin/env node

require('babel-register');
require('babel-polyfill');
require('./fetch_directions').runAsync();
