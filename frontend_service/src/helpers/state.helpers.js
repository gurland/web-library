export function formatGenres(genres) {
  const result = [];

  for (let optGroup in genres) {
    result.push({
      key: optGroup,
      label: optGroup,
      disabled: true,
    });
    for (let genre in genres[optGroup]) {
      result.push({
        text: genres[optGroup][genre],
        value: genre,
        key: genre,
      });
    }
  }

  return result;
}

export function formatLangs(langs) {
  return Object.entries(langs).map(lang => {
    const [ key, value ] = lang;

    return {
      text: value,
      value: key,
      key,
    }
  })
}

export function formatAuthors(authors) {
  return authors.map(author => ({
    text: author,
    value: author,
    key: author,
  }))
}