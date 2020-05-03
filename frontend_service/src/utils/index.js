import { LOCALSTORAGE_KEY } from '../constants';

export function addToLocalStorage(key, data) {
  localStorage.setItem(`${LOCALSTORAGE_KEY}:${key}`, data);
}
