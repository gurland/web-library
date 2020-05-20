import { API_URL } from '../constants';
import buildUrl from 'build-url';

export async function getGenres(language = 'uk') {
  return await get('genres', { language });
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

  console.log(url);

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

// function createUrl(path, queryParams) {
//   return buildUrl(API_URL, {
//     path,
//     queryParams,
//   });
// }