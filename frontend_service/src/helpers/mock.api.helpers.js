import { genres } from './mock.api.data';

export function getAuthors(query = '') {
  return ['Тарас Шевченко', 'Михайло Коцюбинський', 'Микола Гоголь', 'Лесь Подервянський', 'Говно Говно'];
}

export function getGenres() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(genres), 500);
  })
}

export function getLangs() {
  return ['English', 'Spanish', 'Japanese', 'German'];
}

export function getBooks() {
  return [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "title": "string",
      "authors": [
        "string"
      ],
      "genres": [
        "string"
      ],
      "src_lang": "string",
      "lang": "string",
      "cover": "string"
    }
  ]
}
