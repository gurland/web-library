import React from 'react';

export function normalize(obj) {
  const result = {};

  for(let key in obj) {
    if(obj[key]) result[key] = obj[key];
  }

  return result;
}

export function fromSource(coverString) {
  if (!coverString) return null;

  return 'data:image/png;base64,' + coverString;
}

export function findMeta(metadata = [], key) {
  return metadata.find(langMeta => Object.keys(langMeta).includes(key))[key];
}

export function createLinks(sourceArray, queryParam, customUrlCallback = (el) => el) {
  return sourceArray.map(element => <a href={`/results?${queryParam}=${customUrlCallback(element)}`} key={element}>{element}</a>)
}

export function joinComponents(components, separator = ', ') {
  return components.reduce((prev, curr) => [prev, separator, curr])
}

export function getKeyByValue(obj, value) {
  return Object.keys(obj).find(key => obj[key] === value);
}