import { LOCALSTORAGE_KEY } from '../constants';

export function addToStorage(key, data) {
  const dataToSave = typeof key === 'object' ? JSON.stringify(data) : data
  localStorage.setItem(`${LOCALSTORAGE_KEY}:${key}`, dataToSave);
}

export function getFromStorage(key) {
  let data = localStorage.getItem(`${LOCALSTORAGE_KEY}:${key}`)

  try {
    return JSON.parse(data);
  } catch (e) {
    return data;
  }
}
