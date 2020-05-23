import { API_URL } from '../constants';
import buildUrl from 'build-url';
import { addToStorage, getFromStorage } from './localstorage.helpers';
import { reviews } from './mock.api.data';

export async function getGenres(language = 'uk') {
  let genres = getFromStorage('genres');

  if(!genres) {
    genres = await get('genres', { language });
    addToStorage('genres', genres);
  }

  return genres;
}

export async function getBooks(filters = {}) {
  return await get('books', filters);
}

export async function getAuthors(name = '') {
  return await get('authors', { name });
}

export async function getBook(id) {
  return await get(`books/${id}`);
}

export async function getLangs(locale = 'uk') {
  let langs = getFromStorage('langs');

  if(!langs) {
    langs = await get('languages', { language: locale });
    addToStorage('langs', langs)
  }

  return langs;
}

export async function getMetadata() {
  const langsMeta = await getLangs();
  const genresMeta = await getGenres();

  return {
    langsMeta,
    genresMeta: Object.assign({}, ...Object.values(genresMeta)),
  }
}

export async function getReviews(bookId) {
  return await get(`books/${bookId}/reviews`);
}

export async function postReview(bookId, text, rating) {
  const accessToken = getFromStorage('accessToken');

  return await post(`books/${bookId}/reviews`, {
    text,
    rating,
  }, { Authorization: `Bearer ${accessToken}` });
}

export async function authorize(username, password) {
  const response = await post(
    'auth/login',
    { name: username, password }
  );

  const { access_token } = response;

  addToStorage('accessToken', access_token);
}

async function get(path, queryParams = {}) {
  const url = buildUrl(API_URL, {
    path,
    queryParams,
  });

  const response = await fetch(url);
  return await response.json();
}

async function post(path, body, headers = {}) {
  const url = buildUrl(API_URL, { path });

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify(body),
  });

  return await response.json();
}
