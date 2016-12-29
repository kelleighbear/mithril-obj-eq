'use strict';
var curry = require('lodash/curry')

function checkEquality(a, b) {
    if (typeof a !== typeof b) return false;
    else if(typeof a === 'function') return a() === b()
    else if (typeof a === 'object') {
      if (Array.isArray(a) && Array.isArray(b)) {
          return a.every(function(element, index) {
              return checkEquality(element, b[index]);
          });
      } else if (Array.isArray(a) || Array.isArray(b)) {
          return false;
      } else {
        return Object.keys(a).every(function(key) {
            if (!b[key] || typeof a[key] !== typeof b[key]) {
                return false;
            } else {
              return checkEquality(a[key], b[key]);
            }
          });
        }
      } else return a === b;
    }
    //
    //         if (typeof a[key] === 'function') { // Mithril property
    //             return a[key]() === b[key]();
    //         } else if (typeof a[key] === 'object') { // Object or array
    //             if (Array.isArray(a[key]) && Array.isArray(b[key])) {
    //                 return a[key].every(function(element, index) {
    //                     return checkEquality(element, b[key][index]);
    //                 });
    //             } else if (Array.isArray(a[key]) || Array.isArray(b[key])) {
    //                 return false;
    //             } else {
    //                 return checkEquality(a[key], b[key]).every(function(c, d) {
    //                     return c && d;
    //                 }, true);
    //             }
    //         } else { // Normal value
    //             return a[key] === b[key];
    //         }
    //     })
    // }
    // else return a === b;
// }


function equals(a, b) {
    return checkEquality(a, b);
}

module.exports = {
    equals: equals
}
