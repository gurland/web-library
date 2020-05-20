import { API_URL } from '../constants';
import buildUrl from 'build-url';

export async function getGenres(language = 'uk') {
  return await get('genres', { language });
}

export async function getBooks(filters = {}) {
  return await get('books', filters);
}

export async function getAuthors() {

}

export async function getLangs() {

}

async function get(path, queryParams) {
  const url = buildUrl(API_URL, {
    path,
    queryParams,
  });

  const response = await fetch(url);
  return await response.json();
}

async function post(path, body) {
  const response = await fetch(path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  });

  return await response.json();
}
