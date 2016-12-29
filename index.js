'use strict';
var curry = require('lodash/curry')

function checkEquality(a, b) {
  return Object.keys(a).every(function(key) {
    if(!b[key] || typeof a[key] !== typeof b[key]) {
      return false;
    }
    if(typeof a[key] === 'function') { // Mithril property
      return a[key]() === b[key]();
    } else if(typeof a[key] === 'object') { // Object or array
      if(Array.isArray(a[key]) && Array.isArray(b[key])) {
        return a[key].every(function(element, index) {
          return result = checkEquality(element, b[key][index]);
        });
      } else if(Array.isArray(a[key]) || Array.isArray(b[key])) {
        return false;
      } else {
        return checkEquality(a[key], b[key]).every(function(c, d) { return c && d; }, true);
      }
    } else { // Normal value
      return a[key] === b[key];
    }
  })
}

function equals(a, b) {
  return checkEquality(a, b);
}

module.exports = {
  equals: equals
}
