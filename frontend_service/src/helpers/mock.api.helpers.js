import { genres as genresList, books, book, languages, reviews } from './mock.api.data';
import { addToStorage, getFromStorage } from './localstorage.helpers';

export function getAuthors(query = '') {
  return ['Тарас Шевченко', 'Михайло Коцюбинський', 'Микола Гоголь', 'Лесь Подервянський', 'Говно Говно'];
}

export function getGenres() {
  return new Promise((resolve) => {
    setTimeout(() => {
      let genres = getFromStorage('genres');

      if(!genres) {
        addToStorage('genres', genresList);
        resolve(genresList);
      }

      resolve(genres)
    }, 500);
  })
}

export function getBooks() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(books), 500);
  })
}

export function getBook(id) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(book), 500);
  });
}

export function getLangs(locale = 'uk') {
  return new Promise((resolve) => {
    setTimeout(() => {
      let langs = getFromStorage('langs');

      if(!langs) {
        addToStorage('langs', languages[locale])
        resolve(languages[locale])
      }

      resolve(langs)
    }, 500);
  });
}

export function getReviews(id) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(reviews), 500);
  });
}

export function postReview(text, rating) {
  return new Promise(resolve => setTimeout(() => resolve(), 500))
}

export async function getMetadata() {
  const langsMeta = await getLangs();
  const genresMeta = await getGenres();

  return {
    langsMeta,
    genresMeta: Object.assign({}, ...Object.values(genresMeta)),
  }
}
