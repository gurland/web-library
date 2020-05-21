import { genres, books, languages } from './mock.api.data';

export function getAuthors(query = '') {
  return ['Тарас Шевченко', 'Михайло Коцюбинський', 'Микола Гоголь', 'Лесь Подервянський', 'Говно Говно'];
}

export function getGenres() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(genres), 500);
  })
}

export function getBooks() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(books), 500);
  })
}

export async function getLangs(locale = 'uk') {
  return new Promise((resolve) => {
    setTimeout(() => resolve(languages[locale]), 500);
  });
}
