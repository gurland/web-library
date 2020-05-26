import React from 'react';
import { Link } from 'react-router-dom';

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

export function createLinks(source, queryParam, customUrlCallback = (el) => el) {
  if(typeof source === 'string') {
    return (
      <Link
        to={`/results?${queryParam}=${customUrlCallback(source)}`}
        key={source}
      >
        {source}
      </Link>
    );

  }
  return source.map(element => {
    return (
      <Link
        to={`/results?${queryParam}=${customUrlCallback(element)}`}
        key={element}
      >
        {element}
      </Link>
    );
  })
}

export function joinComponents(components, separator = ', ') {
  return components.reduce((prev, curr) => [prev, separator, curr])
}

export function getKeyByValue(obj, value) {
  return Object.keys(obj).find(key => obj[key] === value);
}

export function clarify(array = []) {
  return array.filter(el => !!el)
}

export function getFullDate (dateObj = new Date())  {
  const _format = (...values) => values.map(value => value > 9 ? value : '0' + value);

  const year = dateObj.getFullYear();
  const [
    month,
    day,
    hours,
    minutes
  ] = _format(
    dateObj.getMonth() + 1,
    dateObj.getDate(),
    dateObj.getHours(),
    dateObj.getMinutes()
  );

  return `${day}-${month}-${year} ${hours}:${minutes}`;
}
