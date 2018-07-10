/*
 Applies a mapping method for user's
 considering some keys for an object item
*/

exports.expose = function expose (keys) {
  return function (item) {
    let result = {};
    keys.forEach(function (key, i) {
      const segments = key.split('.');
      if(Array.isArray(item)) {
        if(!Array.isArray(result)) result = []; 
        result = filterThroughArray(item, segments, result);
      } else Object.assign(result, propertyFilter(item, segments, result || {}));
    })
    return result;
  }
}

function propertyFilter(item, keys, cursor = {}) {
  if (typeof item !== 'object') return item;
  const key = keys[0];
  const elementToMap = item[key];
  if (keys.length <= 1) cursor[key] = elementToMap;
  else if (Array.isArray(elementToMap)) {
    cursor[key] = filterThroughArray(elementToMap, keys.slice(1), cursor[keys[0]]);
  }
  else cursor[key] = propertyFilter(elementToMap, keys.slice(1), cursor[key]);
  return cursor;
}

function filterThroughArray(item, keys, cursor = []) {
  return item.map((objInArr, i) => propertyFilter(objInArr, keys, cursor[i]));
}
